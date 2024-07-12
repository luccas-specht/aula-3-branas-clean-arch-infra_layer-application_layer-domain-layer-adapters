import { AccountRepositoryDatabase } from './infrastructure/repository/AccountRepository';
import GetAccount from './application/useCase/account/GetAccount';
import Signup from './application/useCase/account/Signup';

import MailerGatewayFake from './infrastructure/gateway/MailerGatewayFake';
import { PgPromiseAdapter } from './infrastructure/database/DatabaseConnection';
import { HapiAdapter } from './infrastructure/http/HttpServer';
import AccountController from './infrastructure/controller/AccountController';
import RideController from './infrastructure/controller/RideController';
import { RideRepositoryDatabase } from './infrastructure/repository/RideRepository';
import RequestRide from './application/useCase/ride/RequestRide';

// frameworks & drivers and adapters
// const httpServer = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const httpServer = new HapiAdapter();

// Account
const accountRepository = new AccountRepositoryDatabase(connection);
const signup = new Signup(accountRepository, new MailerGatewayFake());
const getAccount = new GetAccount(accountRepository);

new AccountController(httpServer, signup, getAccount);

// Ride
const rideRepository = new RideRepositoryDatabase(connection);
const requestRide = new RequestRide(rideRepository, accountRepository);

new RideController(httpServer, requestRide);

// started
httpServer.listen(3000);
