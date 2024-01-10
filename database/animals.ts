import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Animal } from '../migrations/00000-createTableAnimal';
import {
  AnimalFood,
  AnimalWithFoodsInJsonAgg,
} from '../migrations/00004-createTableAnimalFoods';

// const animals1 = [
//   { id: 1, firstName: 'Lucia', type: 'Lion', accessory: 'Car' },
//   { id: 2, firstName: 'Macca', type: 'Dog', accessory: 'Comb' },
//   { id: 3, firstName: 'Jojo', type: 'Dodo', accessory: 'Dojo' },
//   { id: 4, firstName: 'Flo', type: 'Parrot', accessory: 'Carrot' },
//   { id: 5, firstName: 'Bili', type: 'Capybara', accessory: 'Pen' },
// ];

export const getAnimals = cache(async () => {
  // return animals;
  const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
  `;
  return animals;
});

export const getAnimalsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    // return animals;
    const animals = await sql<Animal[]>`
      SELECT
        *
      FROM
        animals
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;
    return animals;
  },
);

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

export const deleteAnimalById = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    DELETE FROM animals
    WHERE
      id = ${id}
    RETURNING
      *
  `;

  return animal;
});

export const createAnimal = cache(
  // Accept an object as an argument, allowing optional properties like
  // `accessory` before required properties like `birthDate`
  //
  // `Omit` is a TS utility type that excludes a property from a type
  async (newAnimal: Omit<Animal, 'id'>) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO
        animals (
          first_name,
          type,
          accessory,
          birth_date
        )
      VALUES
        (
          ${newAnimal.firstName},
          ${newAnimal.type},
          ${newAnimal.accessory},
          ${newAnimal.birthDate}
        )
      RETURNING
        *
    `;

    return animal;
  },
);

export const updateAnimalById = cache(async (updatedAnimal: Animal) => {
  const [animal] = await sql<Animal[]>`
    UPDATE animals
    SET
      first_name = ${updatedAnimal.firstName},
      type = ${updatedAnimal.type},
      accessory = ${updatedAnimal.accessory},
      birth_date = ${updatedAnimal.birthDate}
    WHERE
      id = ${updatedAnimal.id}
    RETURNING
      *
  `;
  return animal;
});

// export function getAnimal(id: number) {
//   return animals1.find((animal) => animal.id === id);
// }

// animalId: number;
// animalFirstName: string;
// animalType: string;
// animalAccessory: string | null;
// animalFoodId: number;
// animalFoodName: string;
// animalFoodType: string;

// Join query for getting animal with related food/foods
export const getAnimalsWithFoods = cache(async (id: number) => {
  const animalsFoods = await sql<AnimalFood[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.id AS animal_food_id,
      foods.name AS animal_food_name,
      foods.type AS animal_food_type
    FROM
      animals
      LEFT JOIN animal_foods ON animals.id = animal_foods.animal_id
      LEFT JOIN foods ON foods.id = animal_foods.food_id
    WHERE
      animals.id = ${id}
  `;
  return animalsFoods;
});

// Join query for getting a single animal with related food/foods using Json_aag
export const getAnimalWithFoodsById = cache(async (id: number) => {
  const [animal] = await sql<AnimalWithFoodsInJsonAgg[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      (
        SELECT
          json_agg(foods.*)
        FROM
          animal_foods
          INNER JOIN foods ON animal_foods.food_id = foods.id
        WHERE
          animal_foods.animal_id = animals.id
      ) AS animal_foods
    FROM
      animals
    WHERE
      animals.id = ${id}
    GROUP BY
      animals.first_name,
      animals.type,
      animals.accessory,
      animals.id;
  `;

  return animal;
});
