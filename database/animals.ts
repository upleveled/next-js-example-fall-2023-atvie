import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';

// const animals1 = [
//   { id: 1, firstName: 'lucia', type: 'Lion', accessory: 'Car' },
//   { id: 2, firstName: 'macca', type: 'Dog', accessory: 'Comb' },
//   { id: 3, firstName: 'jojo', type: 'Dodo', accessory: 'Dojo' },
//   { id: 4, firstName: 'flo', type: 'Parrot', accessory: 'carrot' },
//   { id: 5, firstName: 'bili', type: 'Capybara', accessory: 'Pen' },
// ];

type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

export const getAnimals = cache(async () => {
  // return animals;
  const animals = await sql<Animal[]>`
    SELECT * FROM animals
  `;
  return animals;
});

export const getAnimalById = cache(async (id: number) => {
  // Postgres always returns an array
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;
  return animal;
});

// export function getAnimal(id: number) {
//   return animals1.find((animal) => animal.id === id);
// }
