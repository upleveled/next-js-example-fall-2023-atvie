import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalByIdInsecure } from '../../../../database/animals';
import { formatDate } from '../../../../util/dates';

export async function generateMetadata(props: Props) {
  const singleAnimal = await getAnimalByIdInsecure(
    Number(props.params.animalId),
  );

  return {
    title: singleAnimal ? singleAnimal.firstName : '',
  };
}

type Props = {
  params: {
    animalId: string;
  };
};

export default async function NaiveAnimalPage(props: Props) {
  const singleAnimal = await getAnimalByIdInsecure(
    Number(props.params.animalId),
  );

  if (!singleAnimal) {
    return notFound();
  }

  return (
    <div>
      This is a single animal page
      <h1>{singleAnimal.firstName}</h1>
      <div>Birth date: {formatDate(singleAnimal.birthDate)}</div>
      <Image
        src={`/images/${singleAnimal.firstName.toLowerCase()}.png`}
        width={200}
        height={200}
        alt={singleAnimal.firstName}
      />
      this is a {singleAnimal.type} carrying {singleAnimal.accessory}
    </div>
  );
}
