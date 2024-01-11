import { notFound } from 'next/navigation';
import { createAnimal } from '../../../database/animals';

export const metadata = {
  description: 'Create a new animal',
};

type Props = {
  searchParams: {
    firstName: string;
    type: string;
    accessory: string;
    birthDate: string;
  };
};

export default async function NaiveCreateAnimalPage(props: Props) {
  const animal = await createAnimal({
    firstName: props.searchParams.firstName,
    type: props.searchParams.type,
    accessory: props.searchParams.accessory || null,
    birthDate: new Date(props.searchParams.birthDate),
  });

  if (typeof animal === 'undefined') {
    notFound();
  }

  return (
    <div>
      <h1>{animal.firstName}</h1>
      <p>has been created with the following information</p>
      <p>Type: {animal.type}</p>
      <p>Accessory: {animal.accessory}</p>
    </div>
  );
}
