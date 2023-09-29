import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../database/animals';

export async function generateMetadata({ params }) {
  const singleAnimal = await getAnimalById(Number(params.animalId));

  return {
    title: singleAnimal ? singleAnimal.firstName : '',
  };
}

export default async function AnimalPage(props) {
  const singleAnimal = await getAnimalById(Number(props.params.animalId));

  if (!singleAnimal) {
    return notFound();
  }
  return (
    <div>
      This is a single animal page
      <h1>{singleAnimal.firstName}</h1>
      <Image
        src={`/images/${singleAnimal.firstName}.png`}
        width={200}
        height={200}
        alt={singleAnimal.firstName}
      />
      this is a {singleAnimal.type} carrying {singleAnimal.accessory}
    </div>
  );
}
