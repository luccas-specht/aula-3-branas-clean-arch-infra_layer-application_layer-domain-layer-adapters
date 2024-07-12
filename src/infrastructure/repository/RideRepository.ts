import { RideRepository } from '../../application/repository/RideRepository';
import Ride from '../../domain/Ride';
import DatabaseConnection from '../database/DatabaseConnection';

export class RideRepositoryDatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getRideByPassengerId(passengerId: string): Promise<Ride | undefined> {
    const [rideData] = await this.connection.query(
      'select * from cccat17.ride where passenger_id = $1',
      [passengerId]
    );

    if (rideData) {
      return new Ride(
        rideData.ride_id,
        rideData.passenger_id,
        rideData.driver_id,
        rideData.status,
        rideData.fare,
        rideData.distance,
        rideData.from_lat,
        rideData.from_long,
        rideData.to_lat,
        rideData.to_long,
        rideData.date
      );
    }

    return undefined;
  }

  async requestRide(ride: Ride): Promise<void> {
    console.log({ ride });
    await this.connection.query(
      'insert into cccat17.ride (ride_id, passenger_id, driver_id, status, fare, distance, from_lat, from_long, to_lat, to_long, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        ride.rideId,
        ride.passengerId,
        ride.driverId,
        ride.status,
        ride.fare,
        ride.distance,
        ride.fromLat,
        ride.fromLong,
        ride.toLat,
        ride.toLong,
        ride.date,
      ]
    );
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
