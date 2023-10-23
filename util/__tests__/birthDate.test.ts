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
      new Date('2021-11-25'),
    ),
  ).toBe(38);
  expect(
    calculateDaysUntilNextBirthday(
      new Date('2023-10-18'),
      new Date('2023-01-01'),
    ),
  ).toBe(75);
  // Leap year 2024
  expect(
    calculateDaysUntilNextBirthday(
      new Date('2024-02-28'),
      new Date('2024-02-29'),
    ),
  ).toBe(1);
});
