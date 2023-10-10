import { expect, test } from '@jest/globals';
import { getAnimalWithFoods } from '../dataStructures';

test('reduce animal favorite foods', () => {
  const animalWithFood = [
    {
      animalId: 1,
      animalFirstName: 'lucia',
      animalType: 'Lion',
      animalAccessory: 'Car',
      animalFoodId: 3,
      animalFoodName: 'Rice',
      animalFoodType: 'Grain',
    },
    {
      animalId: 1,
      animalFirstName: 'lucia',
      animalType: 'Lion',
      animalAccessory: 'Car',
      animalFoodId: 4,
      animalFoodName: 'Mango',
      animalFoodType: 'Fruit',
    },
  ];
  expect(getAnimalWithFoods(animalWithFood)).toStrictEqual({
    id: 1,
    firstName: 'lucia',
    type: 'Lion',
    accessory: 'Car',
    animalFoods: [
      { id: 3, name: 'Rice', type: 'Grain' },
      { id: 4, name: 'Mango', type: 'Fruit' },
    ],
  });
});