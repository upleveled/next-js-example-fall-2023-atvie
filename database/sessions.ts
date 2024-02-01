import { cache } from 'react';
import { sql } from '../database/connect';
import { Session } from '../migrations/00007-createTableSessions';

export const createSession = cache(async (userId: number, token: string) => {
  const [session] = await sql<Session[]>`
    INSERT INTO
      sessions (user_id, token)
    VALUES
      (
        ${userId},
        ${token}
      )
    RETURNING
      id,
      token,
      user_id
  `;

  await sql`
    DELETE FROM sessions
    WHERE
      expiry_timestamp < now()
  `;

  return session;
});

export const deleteSession = cache(async (token: string) => {
  // 'Pick' is a TS utility type that picks specified properties
  // from a type and excluding the rest
  const [session] = await sql<Pick<Session, 'id' | 'token'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});

export const getValidSession = cache(async (token: string) => {
  const [session] = await sql<Pick<Session, 'id' | 'token'>[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
      AND sessions.expiry_timestamp > now()
  `;

  return session;
});
