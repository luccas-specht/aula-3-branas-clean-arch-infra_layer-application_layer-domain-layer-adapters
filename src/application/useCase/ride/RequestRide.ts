import Ride from '../../../domain/Ride';
import AccountRepository from '../../repository/AccountRepository';
import { RideRepository } from '../../repository/RideRepository';
import UseCase from '../UseCase';

// DTO -> Data Transfer Object
type Input = {
  passengerId: string;
  fromLat: string;
  fromLong: string;
  toLat: string;
  toLong: string;
};

type Output = {
  rideId: string;
};

export default class RequestRide implements UseCase<Input, Output> {
  PREVIOUS_RIDES_MUST_HAVE_STATUS_COMPLETED = 'completed';

  rideRepository: RideRepository;
  accountRepository: AccountRepository;

  constructor(
    rideRepository: RideRepository,
    accountRepository: AccountRepository
  ) {
    this.rideRepository = rideRepository;
    this.accountRepository = accountRepository;
  }

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.getAccountById(
      input.passengerId
    );

    if (!account.isPassenger) {
      throw new Error('Requester is not a passenger');
    }

    const ride = await this.rideRepository.getRideByPassengerId(
      input.passengerId
    );

    if (
      ride &&
      ride.status !== this.PREVIOUS_RIDES_MUST_HAVE_STATUS_COMPLETED
    ) {
      throw new Error(
        'Impossible to request a ride while user has already requested'
      );
    }

    const newRide = Ride.create(
      input.passengerId,
      null,
      'requested',
      50,
      50,
      '-29.8464418',
      '-51.1745813',
      '-29.9069906',
      ' -51.1720954',
      new Date()
    );

    this.rideRepository.requestRide(newRide);

    return { rideId: newRide.rideId };
  }
}
