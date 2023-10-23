import { expect, test } from '@jest/globals';
import { calculateDaysUntilNextBirthday } from '../date';

test('calculate days until next birthday', () => {
  expect(
    calculateDaysUntilNextBirthday(
      new Date('2023-10-18'),
      new Date('2021-10-19'),
    ),
  ).toBe(1);

  expect(
    calculateDaysUntilNextBirthday(
      new Date('2023-10-18'),
      new Date('1990-10-18'),
    ),
  ).toBe(0);

  expect(
    calculateDaysUntilNextBirthday(
      new Date('2023-10-18'),
      new Date('2005-11-25'),
    ),
  ).toBe(38);

  expect(
    calculateDaysUntilNextBirthday(
      new Date('2023-10-18'),
      new Date('2020-01-01'),
    ),
  ).toBe(75);

  // Leap year 2024
  expect(
    calculateDaysUntilNextBirthday(
      new Date('2024-02-28'),
      new Date('2024-02-29'),
    ),
  ).toBe(1);

  // pass timestamp values to the function
  expect(
    calculateDaysUntilNextBirthday(
      new Date(1627634400000),
      new Date(1627634400000),
    ),
  ).toBe(0);

  // pass individual values to the function
  expect(
    calculateDaysUntilNextBirthday(
      new Date(2023, 9, 18),
      new Date(1998, 6, 25),
    ),
  ).toBe(280);
});

test('throws an error when arguments are not dates', () => {
  // @ts-expect-error testing incorrect arguments
  expect(() => calculateDaysUntilNextBirthday('123', '2023-01-01')).toThrow(
    'Pass only dates!',
  );
  // @ts-expect-error testing incorrect arguments
  expect(() => calculateDaysUntilNextBirthday('2023-01-01', NaN)).toThrow(
    'Pass only dates!',
  );
  // @ts-expect-error testing incorrect arguments
  expect(() => calculateDaysUntilNextBirthday(12 - 24 - 2023, true)).toThrow(
    'Pass only dates!',
  );
});
