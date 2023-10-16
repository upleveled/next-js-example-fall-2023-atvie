import { expect, test } from '@jest/globals';
import { formatDate } from '../date';

const currentDate = new Date('2023-10-14');

test('format date for displaying the birth date', () => {
  expect(formatDate(currentDate)).toBe('14.10.2023');
});
