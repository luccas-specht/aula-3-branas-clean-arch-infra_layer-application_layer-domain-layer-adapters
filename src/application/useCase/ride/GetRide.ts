import Ride from '../../../domain/Ride';
import { RideRepository } from '../../repository/RideRepository';
import UseCase from '../UseCase';

type Input = {
  rideId: string;
};

type Output = Ride;

export default class GetRide implements UseCase<Input, Output> {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.getRideById(input.rideId);

    if (!ride) throw new Error('ride does not exists with this id');

    return ride;
  }
}
