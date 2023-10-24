import { expect, test } from '@jest/globals';
import { daysUntilNextBirthday } from '../dates';

test('calculate days until next birthday', () => {
  expect(
    daysUntilNextBirthday(new Date('2023-10-18'), new Date('2021-10-19')),
  ).toBe(1);

  expect(
    daysUntilNextBirthday(new Date('2023-10-18'), new Date('1990-10-18')),
  ).toBe(0);

  expect(
    daysUntilNextBirthday(new Date('2023-10-18'), new Date('2005-11-25')),
  ).toBe(38);

  expect(
    daysUntilNextBirthday(new Date('2023-10-18'), new Date('2020-01-01')),
  ).toBe(75);

  // Leap year 2024
  expect(
    daysUntilNextBirthday(new Date('2024-02-28'), new Date('2004-02-29')),
  ).toBe(1);

  // pass timestamp values to the function
  expect(
    daysUntilNextBirthday(new Date(1627634400000), new Date(1627634400000)),
  ).toBe(0);

  // pass individual values to the function
  expect(
    daysUntilNextBirthday(new Date(2023, 9, 24), new Date(1998, 6, 25)),
  ).toBe(275);
});

test('throws an error when arguments are not dates', () => {
  // @ts-expect-error testing incorrect arguments
  expect(() => daysUntilNextBirthday('123', '2023-01-01')).toThrow(
    'Pass only dates!',
  );
  // @ts-expect-error testing incorrect arguments
  expect(() => daysUntilNextBirthday('2023-01-01', NaN)).toThrow(
    'Pass only dates!',
  );
  // @ts-expect-error testing incorrect arguments
  expect(() => daysUntilNextBirthday(12 - 24 - 2023, true)).toThrow(
    'Pass only dates!',
  );
});

test('throws an error when birth date is after current date', () => {
  expect(() =>
    daysUntilNextBirthday(new Date('2023-10-23'), new Date('2024-12-24')),
  ).toThrow('Birth date must be before current date!');

  expect(() =>
    daysUntilNextBirthday(new Date('2023-10-23'), new Date('2030-01-01')),
  ).toThrow('Birth date must be before current date!');
});
