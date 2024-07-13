import crypto from 'crypto';

export default class Ride {
  constructor(
    readonly rideId: string,
    readonly passengerId: string,
    readonly driverId: string | null,
    readonly status: string,
    readonly fare: number,
    readonly distance: number,
    readonly fromLat: string,
    readonly fromLong: string,
    readonly toLat: string,
    readonly toLong: string,
    readonly date: Date
  ) {
    if (!passengerId) throw new Error('Invalid passengerId');
    if (!fromLat) throw new Error('Invalid fromLat');
    if (!fromLong) throw new Error('Invalid fromLong');
    if (!toLat) throw new Error('Invalid toLat');
    if (!toLong) throw new Error('Invalid toLong');
    if (!rideId) throw new Error('Invalid rideId');
    if (driverId !== null && !driverId) throw new Error('Invalid driverId');
    if (!status) throw new Error('Invalid status');
    if (!fare) throw new Error('Invalid fare');
    if (!distance) throw new Error('Invalid distance');
    if (!date) throw new Error('Invalid date');
  }

  // static factory method pattern: https://medium.com/@flaviochess/utilizando-static-factories-ao-inv%C3%A9s-de-construtores-189dc8aaa1c6
  static create(
    passengerId: string,
    driverId: string | null,
    status: string,
    fare: number,
    distance: number,
    fromLat: string,
    fromLong: string,
    toLat: string,
    toLong: string,
    date: Date
  ) {
    const rideId = crypto.randomUUID();

    return new Ride(
      rideId,
      passengerId,
      driverId,
      status,
      fare,
      distance,
      fromLat,
      fromLong,
      toLat,
      toLong,
      date
    );
  }
}
