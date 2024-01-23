import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserWithNotesBySessionToken,
} from '../../database/users';
import CreateNoteForm from './CreateNotesForm';
import styles from './notes.module.scss';

export default async function NotesPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  // 2. Query user with the sessionToken
  // 3. If the user exists, render the page
  // 4. If the user does not exist, redirect to the

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login?returnTo=/notes');

  // Display the notes for the current logged in user
  const userWithNotes = await getUserWithNotesBySessionToken(
    sessionTokenCookie.value,
  );

  return (
    <div className={styles.notePage}>
      <CreateNoteForm userId={user.id} />
      <div>
        {userWithNotes.length > 0 ? (
          <>
            <h2>Notes For {user.username}</h2>
            <ul>
              {userWithNotes.map((userWithNote) => (
                <Link
                  key={`notes-div-${userWithNote.noteId}`}
                  href={`/notes/${userWithNote.noteId}`}
                >
                  <li>{userWithNote.title}</li>
                </Link>
              ))}
            </ul>
          </>
        ) : (
          <h2> No notes yet</h2>
        )}
      </div>
    </div>
  );
}
