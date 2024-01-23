import { cache } from 'react';
import { Note } from '../migrations/00008-createTableNotes';
import { sql } from './connect';

export const createNote = cache(
  async (token: string, title: string, textContent: string) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (user_id, title, text_content) (
          SELECT
            user_id,
            ${title},
            ${textContent}
          FROM
            sessions
          WHERE
            token = ${token}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        *
    `;

    return note;
  },
);
