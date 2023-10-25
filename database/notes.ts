import { cache } from 'react';
import { sql } from './connect';

export const createNote = cache(async (userId: number, textContent: string) => {
  const [note] = await sql<
    { id: number; userId: number | null; textContent: string }[]
  >`
      INSERT INTO notes
        (user_id, text_content)
      VALUES
        (${userId},${textContent})
      RETURNING *
    `;

  return note;
});
