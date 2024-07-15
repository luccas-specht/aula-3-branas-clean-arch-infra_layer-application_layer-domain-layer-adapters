export default class CarPlate {
  private value: string | null;

  constructor(carPlate: string | null) {
    if (carPlate && !carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
      throw new Error('Invalid car plate');
    }

    this.value = carPlate;
  }

  getValue() {
    return this.value;
  }
}
