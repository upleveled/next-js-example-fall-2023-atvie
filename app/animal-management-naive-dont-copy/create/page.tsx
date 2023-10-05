import { createAnimal } from '../../../database/animals';

export const metadata = {
  description: 'Create a new animal',
};

type Props = {
  searchParams: {
    firstName: string;
    type: string;
    accessory: string;
  };
};

export default async function NaiveCreateAnimalPage(props: Props) {
  const animal = await createAnimal(
    props.searchParams.firstName,
    props.searchParams.type,
    props.searchParams.accessory,
  );

  return (
    <div>
      <h1>{animal.firstName}</h1>
      <p>has been created with the following information</p>
      <p>Type: {animal.type}</p>
      <p>Accessory: {animal.accessory}</p>
    </div>
  );
}
