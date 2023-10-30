import { Sql } from 'postgres';

export type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      sessions (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        token VARCHAR(
          150
        ) NOT NULL UNIQUE,
        expiry_timestamp TIMESTAMP NOT NULL DEFAULT NOW () + INTERVAL '24 hours',
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE sessions `;
}
