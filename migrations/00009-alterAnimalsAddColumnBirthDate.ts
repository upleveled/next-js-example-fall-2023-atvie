import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
      ALTER TABLE animals
        ADD COLUMN birth_date date NOT NULL DEFAULT '2023-10-25';
  `;
}

export async function down(sql: Sql) {
  await sql`
      ALTER TABLE animals
        DROP COLUMN birth_date;
    `;
}
