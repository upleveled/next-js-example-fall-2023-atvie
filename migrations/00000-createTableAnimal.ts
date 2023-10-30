import { Sql } from 'postgres';

export type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      animals (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(30) NOT NULL,
        type VARCHAR(30) NOT NULL,
        accessory VARCHAR(30)
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE animals `;
}
