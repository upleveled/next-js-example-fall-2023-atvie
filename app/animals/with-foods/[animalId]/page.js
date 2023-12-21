import Image from 'next/image';
import {
  getAnimalsWithFoods,
  getAnimalWithFoodsById,
} from '../../../../database/animals';
import { reduceAnimalsWithFoods } from '../../../../util/dataStructures';

export default async function AnimalFoodPage(props) {
  const animalsWithFoods = await getAnimalsWithFoods(props.params.animalId);
  const animalWithFood = await getAnimalWithFoodsById(props.params.animalId);

  const animalWithFoods = reduceAnimalsWithFoods(animalsWithFoods);

  return (
    <div>
      <h1>
        {animalWithFoods.firstName} (using data transformation in JavaScript)
      </h1>
      <Image
        src={`/images/${animalWithFoods.firstName.toLowerCase()}.png`}
        alt={`A picture of ${animalWithFoods.firstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoods.type} carrying a {animalWithFoods.accessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoods.animalFoods.map((animalFood) => {
          return (
            <li key={`animal-with-foods-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <br />
      <h1>
        {animalWithFood.animalFirstName} (using data transformation in SQL using
        json_agg)
      </h1>
      <Image
        src={`/images/${animalWithFood.animalFirstName.toLowerCase()}.png`}
        alt={`A picture of ${animalWithFood.animalFirstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFood.animalType} carrying a{' '}
        {animalWithFood.animalAccessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFood.animalFoods.map((animalFood) => {
          return (
            <li key={`animal-with-food-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
