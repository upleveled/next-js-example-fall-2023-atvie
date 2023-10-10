import Image from 'next/image';
import {
  getAnimalsWithFoods,
  getAnimalWithFoodsById,
} from '../../../../database/animals';
import { getAnimalWithFoods } from '../../../../util/dataStructures';

export default async function AnimalFoodPage(props) {
  const animalsWithFoods = await getAnimalsWithFoods(props.params.animalId);
  const animalWithFoodJsonAgg = await getAnimalWithFoodsById(
    props.params.animalId,
  );

  const animalWithFoods = getAnimalWithFoods(animalsWithFoods);

  return (
    <div>
      <h1>
        {animalWithFoods.firstName} (using data transformation in JavaScript)
      </h1>
      <Image
        src={`/images/${animalWithFoods.firstName}.png`}
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
            <li key={`This-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <br />
      <h1>
        {animalWithFoodJsonAgg.animalFirstName} (using data transformation in
        SQL using json_agg)
      </h1>
      <Image
        src={`/images/${animalWithFoodJsonAgg.animalFirstName}.png`}
        alt={`A picture of ${animalWithFoodJsonAgg.animalFirstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoodJsonAgg.animalType} carrying a{' '}
        {animalWithFoodJsonAgg.animalAccessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoodJsonAgg.animalFoods.map((animalFood) => {
          return (
            <li key={`This-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
