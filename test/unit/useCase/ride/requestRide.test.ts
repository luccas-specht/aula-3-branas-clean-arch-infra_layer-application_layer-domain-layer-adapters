import AccountRepository from '../../../../src/application/repository/AccountRepository';
import { RideRepository } from '../../../../src/application/repository/RideRepository';
import RequestRide from '../../../../src/application/useCase/ride/RequestRide';
import { AccountRepositoryMemory } from '../../../../src/infrastructure/repository/AccountRepository';
import { RideRepositoryInMemory } from '../../../../src/infrastructure/repository/RideRepository';

let accountRepository: AccountRepository;
let requestRide: RequestRide;
let rideRepository: RideRepository;

beforeEach(() => {
  rideRepository = new RideRepositoryInMemory();
  accountRepository = new AccountRepositoryMemory();
  requestRide = new RequestRide(rideRepository, accountRepository);
});

test('Should found an account valid when request a ride', async () => {
  const dummySaveAccount = {
    accountId: 'opa',
    name: 'opa',
    email: 'opa',
    cpf: 'opa',
    carPlate: 'opa',
    isPassenger: true,
    isDriver: false,
  } as any;

  const input = {
    passengerId: 'opa',
    fromLat: 'fake',
    fromLong: 'fake',
    toLat: 'fake',
    toLong: 'fake',
  };

  await accountRepository.saveAccount(dummySaveAccount);
  const result = await requestRide.execute(input);
  const rideCreated = await rideRepository.getRideByPassengerId(
    input.passengerId
  );
  expect(result).toHaveProperty('rideId');
  expect(rideCreated).toHaveProperty('passengerId');
  expect(rideCreated).toHaveProperty('status');
  expect(rideCreated?.status).toBe('requested');
  expect(rideCreated?.driverId).toBe(null);
  expect(rideCreated).toHaveProperty('fare');
  expect(rideCreated).toHaveProperty('distance');
  expect(rideCreated).toHaveProperty('from');
  expect(rideCreated).toHaveProperty('to');
  expect(rideCreated).toHaveProperty('date');
  expect(rideCreated?.date.getTime()).toBeCloseTo(new Date().getTime(), -2);
});

test('Should throw Requester is not a passenger exception when user is not a passenger', async () => {
  const dummySaveAccount = {
    accountId: 'opa',
    name: 'opa',
    email: 'opa',
    cpf: 'opa',
    carPlate: 'opa',
    isPassenger: false,
    isDriver: true,
  } as any;

  const input = {
    passengerId: 'opa',
    fromLat: 'fake',
    fromLong: 'fake',
    toLat: 'fake',
    toLong: 'fake',
  };

  await accountRepository.saveAccount(dummySaveAccount);

  await expect(() => requestRide.execute(input)).rejects.toThrow(
    new Error('Requester is not a passenger')
  );
});

test('Should throw Impossible to request a ride while user has already requested exception', async () => {
  const dummySaveAccount = {
    accountId: 'opa',
    name: 'opa',
    email: 'opa',
    cpf: 'opa',
    carPlate: 'opa',
    isPassenger: true,
    isDriver: true,
  } as any;

  const input = {
    passengerId: 'opa',
    fromLat: 'fake',
    fromLong: 'fake',
    toLat: 'fake',
    toLong: 'fake',
    status: 'requested',
  } as any;

  await accountRepository.saveAccount(dummySaveAccount);
  await rideRepository.requestRide(input);

  await expect(() => requestRide.execute(input)).rejects.toThrow(
    new Error('Impossible to request a ride while user has already requested')
  );
});
