import UseCase from '../UseCase';
import MailerGateway from '../../gateway/MailerGateway';
import AccountRepository from '../../repository/AccountRepository';
import Account from '../../../domain/Account';

//DTO
type Input = {
  name: string;
  email: string;
  cpf: string;
  carPlate: string | null;
  isPassenger?: boolean;
  isDriver?: boolean;
};

type Output = {
  accountId: string;
};

export default class Signup implements UseCase<Input, Output> {
  accountRepository: AccountRepository;
  mailerGateway: MailerGateway;

  constructor(
    accountRepository: AccountRepository,
    mailerGateway: MailerGateway
  ) {
    this.accountRepository = accountRepository;
    this.mailerGateway = mailerGateway;
  }

  async execute(input: Input): Promise<Output> {
    const existingAccount = await this.accountRepository.getAccountByEmail(
      input.email
    );
    if (existingAccount) throw new Error('Account already exists');
    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      !!input.isPassenger,
      !!input.isDriver
    );
    await this.accountRepository.saveAccount(account);
    await this.mailerGateway.send(account.getValue(), 'Welcome!', '');
    return {
      accountId: account.accountId,
    };
  }
}
