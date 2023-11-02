import { Sql } from 'postgres';

const animals = [
  { id: 1, firstName: 'Lucia', type: 'Lion', accessory: 'Car' },
  { id: 2, firstName: 'Macca', type: 'Dog', accessory: 'Comb' },
  { id: 3, firstName: 'Jojo', type: 'Dodo', accessory: 'Dojo' },
  { id: 4, firstName: 'Flo', type: 'Parrot', accessory: 'Carrot' },
  { id: 5, firstName: 'Bili', type: 'Capybara', accessory: 'Pen' },
];

export async function up(sql: Sql) {
  for (const animal of animals) {
    await sql`
      INSERT INTO animals
        (first_name, type, accessory)
      VALUES
        (${animal.firstName}, ${animal.type}, ${animal.accessory})
  `;
  }
}

export async function down(sql: Sql) {
  for (const animal of animals) {
    await sql`
      DELETE FROM animals WHERE id = ${animal.id}
    `;
  }
}
