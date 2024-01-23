import { cache } from 'react';
import { Note } from '../migrations/00008-createTableNotes';
import { sql } from './connect';

export const createNote = cache(
  async (userId: number, title: string, textContent: string) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (user_id, title, text_content)
      VALUES
        (
          ${userId},
          ${title},
          ${textContent}
        )
      RETURNING
        *
    `;

    return note;
  },
);
