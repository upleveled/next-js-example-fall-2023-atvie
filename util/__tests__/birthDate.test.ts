import { expect, test } from '@jest/globals';
import { calculateDaysUntilBirthday } from '../date';

const currentDate = new Date('2023-10-14');
const birthDate = new Date('2021-11-25');

test('calculate days until birthday', () => {
  expect(calculateDaysUntilBirthday(currentDate, birthDate)).toBe(42);
});
