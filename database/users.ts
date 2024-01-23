import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00006-createTableUsers';
import { Note } from '../migrations/00008-createTableNotes';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (username, password_hash)
      VALUES
        (
          ${username.toLowerCase()},
          ${passwordHash}
        )
      RETURNING
        id,
        username
    `;
    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        username = ${username.toLowerCase()}
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return user;
});

export const getNotesBySessionToken = cache(async (token: string) => {
  const notes = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND notes.user_id = sessions.user_id
        AND sessions.expiry_timestamp > now()
      )
  `;
  return notes;
});

export const getNoteBySessionToken = cache(
  async (token: string, noteId: number) => {
    const [note] = await sql<Note[]>`
      SELECT
        notes.*
      FROM
        notes
        INNER JOIN sessions ON (
          sessions.token = ${token}
          AND notes.user_id = sessions.user_id
          AND sessions.expiry_timestamp > now()
        )
      WHERE
        notes.id = ${noteId}
    `;
    return note;
  },
);
