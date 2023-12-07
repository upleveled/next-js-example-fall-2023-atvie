'use client';
import { useState } from 'react';
import { Animal } from '../../../migrations/00000-createTableAnimal';

type Props = {
  animals: Animal[];
};

export default function Dashboard(props: Props) {
  const [animals, setAnimals] = useState(props.animals);

  async function showMore() {
    const response = await fetch(
      `/api/animals?limit=3&offset=${animals.length}`,
    );

    const data = await response.json();

    setAnimals([...animals, ...data.animals]);
  }

  return (
    <>
      {animals.map((animal) => (
        <div key={`animal-${animal.id}`}>
          {animal.firstName}
          {animal.type}
          {animal.accessory}
        </div>
      ))}
      <button onClick={async () => await showMore()}>show 3 more</button>
    </>
  );
}
