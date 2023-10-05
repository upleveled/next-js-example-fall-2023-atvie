import { AnimalFood } from '../migrations/00004-createTableAnimalFoods';

export function getAnimalWithFoods(animalsWithFoods: AnimalFood[]) {
  if (typeof animalsWithFoods[0] === 'undefined') {
    throw new Error('No animal found');
  }
  const animalWithFoods = {
    id: animalsWithFoods[0].animalId,
    firstName: animalsWithFoods[0].animalFirstName,
    type: animalsWithFoods[0].animalType,
    accessory: animalsWithFoods[0].animalAccessory,
    animalFoods: animalsWithFoods.map((animalWithFood) => {
      return {
        id: animalWithFood.animalFoodId,
        name: animalWithFood.animalFoodName,
        type: animalWithFood.animalFoodType,
      };
    }),
  };
  return animalWithFoods;
}
