import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../database/animals';

type Props = {
  params: {
    animalId: string;
  };
};

export async function generateMetadata(props: Props) {
  const singleAnimal = await getAnimalById(Number(props.params.animalId));

  return {
    title: singleAnimal ? singleAnimal.firstName : '',
  };
}

export default async function AnimalPage(props: Props) {
  const singleAnimal = await getAnimalById(Number(props.params.animalId));

  if (!singleAnimal) {
    return notFound();
  }

  const formattedBirthDate = singleAnimal.birthDate.toLocaleDateString('de-AT');

  const currentDate = new Date();

  const nextBirthDate = new Date(
    currentDate.getFullYear(),
    singleAnimal.birthDate.getMonth(),
    singleAnimal.birthDate.getDate(),
  );

  if (nextBirthDate < currentDate) {
    nextBirthDate.setFullYear(currentDate.getFullYear() + 1);
  }

  const daysUntilBirthday = Math.ceil(
    (nextBirthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div>
      This is a single animal page
      <h1>{singleAnimal.firstName}</h1>
      <div>Birth date: {formattedBirthDate}</div>
      <div>Days left until Birthday: {daysUntilBirthday}</div>
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
