import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserNoteBySessionToken } from '../../../database/users';
import styles from '../notes.module.scss';

type Props = {
  params: {
    noteId: string;
  };
};

export default async function NotePage({ params }: Props) {
  // Task: Restrict access to the note page only to the user who created the note
  // 1. Check if the sessionToken cookie exists
  // 2. Query the notes with the session token and noteId
  // 3. If there is no note for the current user, show restricted access message

  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. Query the notes with the session token and noteId
  const userNote =
    sessionTokenCookie &&
    (await getUserNoteBySessionToken(
      sessionTokenCookie.value,
      Number(params.noteId),
    ));

  // 3. If there is no note for the current user, show restricted access message
  if (!userNote) {
    return (
      <div className={styles.restrictedAccessError}>
        <h2>Restricted access</h2>
        <Link href="/notes">Back to notes</Link>
      </div>
    );
  }

  return (
    <div className={styles.userNote}>
      <h1>Title: {userNote.title}</h1>
      <p>Content: {userNote.textContent}</p>
      <p>Created by: {userNote.username}</p>
      <Link href="/notes">Back to notes</Link>
    </div>
  );
}
