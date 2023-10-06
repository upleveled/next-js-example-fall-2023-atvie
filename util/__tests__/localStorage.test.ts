import { expect, test } from '@jest/globals';
import { getLocalStorage } from '../localStorage';

test('set, get and delete localStorage', () => {
  // When accessing a key in the local storage that doesn't exist, the returned value is null
  expect(getLocalStorage('cookiePolicy')).toBe(null);
  expect(getLocalStorage('cookiePolicy')).toBeNull();
  // set the localStorage key to true
  expect(() => localStorage.setItem('cookiePolicy', 'true')).not.toThrow();
  // make sure that the localStorage key is set to true
  expect(getLocalStorage('cookiePolicy')).toBe('true');
  // best practice: clear state after testing
  expect(() => localStorage.removeItem('cookiePolicy')).not.toThrow();
  expect(getLocalStorage('cookiePolicy')).toBe(null);
});
