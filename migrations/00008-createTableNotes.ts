import { Sql } from 'postgres';

export type Note = {
  id: number;
  userId: number;
  title: string;
  textContent: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE notes (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      title varchar(100) NOT NULL,
      text_content TEXT NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE notes `;
}
