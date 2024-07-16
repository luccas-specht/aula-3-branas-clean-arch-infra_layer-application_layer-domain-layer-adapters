export default class Coord {
  private lat: string;
  private long: string;

  constructor(long: string, lat: string) {
    if (!long) throw new Error('Invalid long');
    if (!lat) throw new Error('Invalid lat');
    this.lat = lat;
    this.long = long;
  }

  getLat() {
    return this.lat;
  }

  getLong() {
    return this.long;
  }
}
