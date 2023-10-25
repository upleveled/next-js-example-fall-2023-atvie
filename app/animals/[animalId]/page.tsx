import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

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

  const daysUntilNextBirthday = getDaysUntilNextBirthday(
    new Date(),
    singleAnimal.birthDate,
  );

  return (
    <div>
      This is a single animal page
      <h1>{singleAnimal.firstName}</h1>
      <div>Birth date: {formatDate(singleAnimal.birthDate)}</div>
      <div>Days left until Birthday: {daysUntilNextBirthday}</div>
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
