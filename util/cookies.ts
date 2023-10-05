import { cookies } from 'next/headers';

// nullish coalescing operator
export function getCookie(name: string) {
  return cookies().get(name)?.value;
}
