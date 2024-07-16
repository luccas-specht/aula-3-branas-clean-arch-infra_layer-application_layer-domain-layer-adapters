import crypto from 'crypto';
import Cpf from './Cpf';
import Email from './Email';
import CarPlate from './CarPlate';
import Name from './Name';

// Entity, forma um aggregate liderado por Account(Root) que contém Name, Email, Cpf e CarPlate
export default class Account {
  private name: Name;
  private cpf: Cpf;
  private email: Email;
  private carPlate: CarPlate;

  constructor(
    readonly accountId: string,
    name: string,
    email: string,
    cpf: string,
    carPlate: string | null,
    readonly isPassenger: boolean,
    readonly isDriver: boolean
  ) {
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new Cpf(cpf);
    this.carPlate = new CarPlate(isDriver ? carPlate : null);
  }

  // static factory method pattern: https://medium.com/@flaviochess/utilizando-static-factories-ao-inv%C3%A9s-de-construtores-189dc8aaa1c6
  static create(
    name: string,
    email: string,
    cpf: string,
    carPlate: string | null,
    isPassenger: boolean,
    isDriver: boolean
  ) {
    const accountId = crypto.randomUUID();
    return new Account(
      accountId,
      name,
      email,
      cpf,
      carPlate,
      isPassenger,
      isDriver
    );
  }

  getCpf() {
    return this.cpf.getValue();
  }

  getValue() {
    return this.email.getValue();
  }

  getCarPlate() {
    return this.carPlate.getValue();
  }

  getName() {
    return this.name.getValue();
  }
}
