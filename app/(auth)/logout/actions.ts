'use server';

import { cookies } from 'next/headers';
import { deleteSession } from '../../../database/sessions';

export async function logout() {
  // Get the session token from the cookie
  const cookieStore = cookies();

  const token = cookieStore.get('sessionToken');

  //  Delete the session from the database based on the token
  if (token) await deleteSession(token.value);

  // Delete the session cookie from the browser
  cookieStore.set('sessionToken', '', {
    maxAge: -1,
  });
}
