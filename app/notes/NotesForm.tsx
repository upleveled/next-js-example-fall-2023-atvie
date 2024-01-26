'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '../../migrations/00006-createTableUsers';
import { Note } from '../../migrations/00008-createTableNotes';
import styles from './NotesForm.module.scss';

type Props = {
  notes: Note[];
  user: User;
};

export default function NotesForm(props: Props) {
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  const router = useRouter();

  return (
    <>
      <h1>Notes</h1>

      <div className={styles.notePage}>
        <div>
          {props.notes.length === 0 ? (
            <h2>No notes yet</h2>
          ) : (
            <>
              <h2>Notes For {props.user.username}</h2>
              <ul>
                {props.notes.map((note) => (
                  <li key={`notes-${note.id}`}>
                    <Link href={`/notes/${note.id}`}>{note.title}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className={styles.noteForm}>
          <div>
            <h2>Create Note</h2>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await fetch('/api/notes', {
                  method: 'POST',
                  body: JSON.stringify({
                    title,
                    textContent,
                  }),
                });
                router.refresh();
                setTitle('');
                setTextContent('');
              }}
            >
              <label>
                Title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.currentTarget.value)}
                />
              </label>

              <label>
                Note
                <input
                  value={textContent}
                  onChange={(event) =>
                    setTextContent(event.currentTarget.value)
                  }
                />
              </label>

              <button>Add Note</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
