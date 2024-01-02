import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE foods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      type varchar(30) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE foods `;
}
