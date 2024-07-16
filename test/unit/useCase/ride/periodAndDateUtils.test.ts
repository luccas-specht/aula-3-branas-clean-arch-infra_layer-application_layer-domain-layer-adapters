import DateUtils from '../../../../src/domain/DateUtil';
import Period from '../../../../src/domain/Period';

test('Deve calcular o tempo de uma corrida, utilizando o value object Period', () => {
  const start = new Date('2023-01-10t10:00:00');
  const end = new Date('2023-01-10t10:30:00');

  const result = new Period(start, end);

  expect(result.calculateDiffInMili()).toBe(1800000);
});

test('Deve calcular o tempo de uma corrida, utilizando o service DateUtils', () => {
  const start = new Date('2023-01-10t10:00:00');
  const end = new Date('2023-01-10t10:30:00');

  const result = DateUtils.calculateDiffInMili(start, end);

  expect(result).toBe(1800000);
});
