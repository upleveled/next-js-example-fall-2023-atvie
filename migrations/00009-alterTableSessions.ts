import { Sql } from 'postgres';

export type Session = {
  id: number;
  token: string;
  userId: number;
  csrfSecret: string;
};

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE sessions
    -- The new column is created with a default value of empty strings
    -- that will bge added to all the records in this table
      ADD csrf_secret varchar(80) NOT NULL DEFAULT ''
  `;
  await sql`
    ALTER TABLE sessions
    -- We don't need the DEFAULT keyword anymore
    -- So we alter the table again and remote it
    -- This makes the csrf_secret NOT NULL again
      ALTER COLUMN csrf_secret DROP DEFAULT
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE sessions
      DROP COLUMN csrf_secret
  `;
}
