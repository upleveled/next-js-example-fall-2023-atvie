import { Sql } from 'postgres';

const animalsBirthDates = [
  { date: new Date('2023-10-25') },
  { date: new Date('2022-05-14') },
  { date: new Date('2021-01-11') },
  { date: new Date('2020-12-31') },
  { date: new Date('2023-03-10') },
];

export async function up(sql: Sql) {
  for (const animalsBirthDate of animalsBirthDates) {
    await sql`
      UPDATE animals
        SET birth_date = ${animalsBirthDate.date};
  `;
  }
}
