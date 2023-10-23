import { expect, test } from '@jest/globals';
import { formatDate } from '../date';

test('format date for displaying the date with different locale date formats', () => {
  expect(formatDate(new Date('2023-10-20'), 'us-US')).toBe('10/20/2023');

  expect(formatDate(new Date('2023-10-20'), 'de-DE')).toBe('20.10.2023');

  expect(formatDate(new Date('2023-10-20'), 'en-GB')).toBe('20/10/2023');

  // Date for 29/02 without leap year
  expect(formatDate(new Date('2023-02-29'), 'en-GB')).toBe('01/03/2023');

  // Date for 29/02 with leap year
  expect(formatDate(new Date('2024-02-29'), 'en-GB')).toBe('29/02/2024');

  // Create a new Date object from a timestamp
  expect(formatDate(new Date(1698054125000), 'en-US')).toBe('10/23/2023');

  // Create a new Date object from individual values
  // Months are 0 based, because they are represented as an index in an array
  expect(formatDate(new Date(2023, 9, 22, 12, 0, 0), 'en-US')).toBe(
    '10/22/2023',
  );
});

test('format date for displaying the date with different options', () => {
  expect(
    formatDate(new Date('2023-10-20'), 'de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  ).toBe('20. Oktober 2023');

  expect(
    formatDate(new Date('2023-10-20'), 'de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  ).toBe('20. Okt. 2023');

  expect(
    formatDate(new Date('2023-10-20'), 'de-DE', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
  ).toBe('20.10.23');
});

test('throws an error when dates are not valid', () => {
  expect(formatDate(new Date('25-03-2023'), 'de-DE')).toBe('Invalid Date');

  expect(formatDate(new Date('25.03.2023'), 'de-DE')).toBe('Invalid Date');

  expect(formatDate(new Date('1698054125000'), 'de-DE')).toBe('Invalid Date');
});
