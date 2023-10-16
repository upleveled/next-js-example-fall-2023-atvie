import { Sql } from 'postgres';

const animals = [
  {
    id: 1,
    firstName: 'Lucia',
    type: 'Lion',
    accessory: 'Car',
    birthDate: new Date('2020-12-25'),
  },
  {
    id: 2,
    firstName: 'Macca',
    type: 'Dog',
    accessory: 'Comb',
    birthDate: new Date('2020-12-25'),
  },
  {
    id: 3,
    firstName: 'Jojo',
    type: 'Dodo',
    accessory: 'Dojo',
    birthDate: new Date('2020-12-25'),
  },
  {
    id: 4,
    firstName: 'Flo',
    type: 'Parrot',
    accessory: 'carrot',
    birthDate: new Date('2020-12-25'),
  },
  {
    id: 5,
    firstName: 'Bili',
    type: 'Capybara',
    accessory: 'Pen',
    birthDate: new Date('2020-12-25'),
  },
];

export async function up(sql: Sql) {
  for (const animal of animals) {
    await sql`
      INSERT INTO animals
        (first_name, type, accessory, birth_date)
      VALUES
        (${animal.firstName}, ${animal.type}, ${animal.accessory}, ${animal.birthDate})
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
