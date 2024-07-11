import { AccountRepositoryDatabase } from './infrastructure/repository/AccountRepository';
import GetAccount from './application/useCase/account/GetAccount';
import Signup from './application/useCase/account/Signup';

import MailerGatewayFake from './infrastructure/gateway/MailerGatewayFake';
import { PgPromiseAdapter } from './infrastructure/database/DatabaseConnection';
import { HapiAdapter } from './infrastructure/http/HttpServer';
import AccountController from './infrastructure/controller/AccountController';

const connection = new PgPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection);
const signup = new Signup(accountRepository, new MailerGatewayFake());
const getAccount = new GetAccount(accountRepository);
// const httpServer = new ExpressAdapter();
const httpServer = new HapiAdapter();
new AccountController(httpServer, signup, getAccount);
httpServer.listen(3000);
