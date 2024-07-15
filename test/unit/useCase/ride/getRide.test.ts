import Sinon from 'sinon';
import { RideRepositoryDatabase } from '../../../../src/infrastructure/repository/RideRepository';
import { RideRepository } from '../../../../src/application/repository/RideRepository';
import GetRide from '../../../../src/application/useCase/ride/GetRide';
import DatabaseConnection, {
  PgPromiseAdapter,
} from '../../../../src/infrastructure/database/DatabaseConnection';
import Ride from '../../../../src/domain/Ride';

let getRide: GetRide;
let dbConnection: DatabaseConnection;
let rideRepository: RideRepository;

beforeEach(() => {
  dbConnection = new PgPromiseAdapter();
  rideRepository = new RideRepositoryDatabase(dbConnection);
  getRide = new GetRide(rideRepository);
});

test('Should return a ride correctly', async () => {
  const inputGetRideStub = Ride.create(
    'It does not matter',
    null,
    'does not matter',
    1000000000000,
    -1,
    'asas',
    'aasas',
    'asasas',
    'asasas',
    new Date()
  );

  const stub = Sinon.stub(
    RideRepositoryDatabase.prototype,
    'getRideById'
  ).resolves(inputGetRideStub);

  const result = await getRide.execute({
    rideId: 'It does not matter what Ill be passing here',
  });

  expect(result).toBeDefined();
  expect(result.rideId).toBeDefined();

  stub.restore();
});
