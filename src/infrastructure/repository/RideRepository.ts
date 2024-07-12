import { RideRepository } from '../../application/repository/RideRepository';
import Ride from '../../domain/Ride';
import DatabaseConnection from '../database/DatabaseConnection';

export class RideRepositoryDatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getRideByPassengerId(passengerId: string): Promise<Ride | undefined> {
    throw new Error('Method not implemented.');
  }

  async requestRide(ride: Ride): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export class RideRepositoryInMemory implements RideRepository {
  rides: Ride[];

  constructor() {
    this.rides = [];
  }

  async getRideByPassengerId(passengerId: string): Promise<Ride | undefined> {
    return this.rides.find((ride) => ride.passengerId === passengerId);
  }

  async requestRide(ride: Ride): Promise<void> {
    const newRide: Ride = ride;
    this.rides.push(newRide);
  }
}
