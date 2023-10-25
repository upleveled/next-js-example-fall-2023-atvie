import { Sql } from 'postgres';

export type Sessions = {
  id: number;
  token: string;
  userId: number;
  csrfSecret: string;
};

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE sessions
      ADD csrf_secret varchar(80)
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE sessions
      DROP COLUMN csrf_secret
  `;
}
