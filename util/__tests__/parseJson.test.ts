import { expect, test } from '@jest/globals';
import { parseJson } from '../json';

test('parseJson should return the expected results', () => {
  expect(parseJson('{"name": "john", "age":30}')).toStrictEqual({
    name: 'john',
    age: 30,
  });
});
