import AccountRepository from '../../repository/AccountRepository';
import UseCase from '../UseCase';

type Output = {
  accountId: string;
  name: string;
  email: string;
  cpf: string;
  carPlate: string | null;
  isPassenger: boolean;
  isDriver: boolean;
};

export default class GetAccount implements UseCase<string, Output> {
  accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(accountId: string): Promise<Output> {
    const account = await this.accountRepository.getAccountById(accountId);
    return {
      accountId: account.accountId,
      name: account.getName(),
      email: account.getValue(),
      cpf: account.getCpf(),
      carPlate: account.getCarPlate(),
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
    };
  }
}
