import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

test('Deve criar uma conta de passageiro pela api', async function () {
  const inputSignup = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    isPassenger: true,
  };
  const responseSignup = await axios.post(
    'http://localhost:3000/signup',
    inputSignup
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(
    `http://localhost:3000/accounts/${outputSignup.accountId}`
  );
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(inputSignup.name);
  expect(outputGetAccount.email).toBe(inputSignup.email);
  expect(outputGetAccount.cpf).toBe(inputSignup.cpf);
});

test('Não deve criar uma conta de passageiro com cpf inválido pela api', async function () {
  const inputSignup = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '9745632155810',
    isPassenger: true,
  };
  const responseSignup = await axios.post(
    'http://localhost:3000/signup',
    inputSignup
  );
  const outputSignup = responseSignup.data;
  expect(responseSignup.status).toBe(422);
  expect(outputSignup.message).toBe('Invalid cpf');
});

test('Deve solicitar uma corrida pela API corretamente', async function () {
  const signup = {
    name: 'John Doe lukinhas',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '97456321558',
    isPassenger: true,
  };

  const responseSignup = await axios.post(
    'http://localhost:3000/signup',
    signup
  );

  const outputSignup = responseSignup.data;

  const input = {
    passengerId: outputSignup.accountId,
    fromLat: '-29.8464418',
    fromLong: '-29.8464418',
    toLat: '-29.9069906',
    toLong: '-51.1720954',
  };

  console.log({ xxxxx: outputSignup.accountId });

  const responseRequestRide = await axios.post(
    'http://localhost:3000/request',
    input
  );

  expect(outputSignup).toBeDefined();
  expect(outputSignup.accountId).toBeDefined();

  const outputRequestRide = responseRequestRide.data;
  console.log(outputRequestRide);
  expect(outputRequestRide).toBeDefined();
  expect(outputRequestRide.rideId).toBeDefined();
});
