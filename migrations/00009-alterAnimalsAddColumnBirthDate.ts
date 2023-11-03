import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE animals
    ADD COLUMN birth_date DATE NOT NULL DEFAULT '2020-01-01';
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE animals
    DROP COLUMN birth_date;
  `;
}
