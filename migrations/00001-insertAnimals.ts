import { Sql } from 'postgres';

const animals = [
  { id: 1, firstName: 'lucia', type: 'Lion', accessory: 'Car' },
  { id: 2, firstName: 'macca', type: 'Dog', accessory: 'Comb' },
  { id: 3, firstName: 'jojo', type: 'Dodo', accessory: 'Dojo' },
  { id: 4, firstName: 'flo', type: 'Parrot', accessory: 'carrot' },
  { id: 5, firstName: 'bili', type: 'Capybara', accessory: 'Pen' },
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
