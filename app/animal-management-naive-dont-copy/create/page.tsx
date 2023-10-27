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
    birthDate: Date;
  };
};

export default async function NaiveCreateAnimalPage(props: Props) {
  const animal = await createAnimal(
    props.searchParams.firstName,
    props.searchParams.type,
    props.searchParams.birthDate,
    props.searchParams.accessory,
  );

  if (typeof animal === 'undefined') {
    notFound();
  }

  return (
    <div>
      <h1>{animal.firstName}</h1>
      <p>has been created with the following information</p>
      <p>Type: {animal.type}</p>
      <p>Accessory: {animal.accessory}</p>
      <p>Birth date: {animal.birthDate.toLocaleString()}</p>
    </div>
  );
}
