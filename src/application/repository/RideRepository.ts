import Ride from '../../domain/Ride';

export interface RideRepository {
  requestRide(ride: Ride): Promise<void>;
  getRideByPassengerId(passengerId: string): Promise<Ride | undefined>;
}
