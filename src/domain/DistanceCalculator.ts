import Coord from './Coord';

export default class DistanceCalculator {
  static calculate(from: Coord, to: Coord) {
    const earthRadius = 6371;

    const degreesToRadians = Math.PI / 180;

    const deltaLat =
      (Number(to.getLat()) - Number(from.getLat())) * degreesToRadians;

    const deltaLon =
      (Number(to.getLong()) - Number(from.getLong())) * degreesToRadians;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(Number(from.getLat()) * degreesToRadians) *
        Math.cos(Number(to.getLat()) * degreesToRadians) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return Math.round(distance);
  }
}
