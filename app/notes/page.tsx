import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getNotesBySessionToken } from '../../database/notes';
import { getUserBySessionToken } from '../../database/users';
import NoteForm from './NotesForm';

export default async function NotesPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user

  // 1. Check if the sessionToken cookie exists
  // 2. Query user with the sessionToken
  // 3. If the user exists, render the page
  // 4. If the user does not exist, redirect to the

  // 5. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  // 6. Display the notes for the current logged in user
  const notes = await getNotesBySessionToken(sessionTokenCookie.value);

  return <NoteForm notes={notes} user={user} />;
}
