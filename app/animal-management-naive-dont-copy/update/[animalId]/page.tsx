import { notFound } from 'next/navigation';
import { updateAnimalById } from '../../../../database/animals';

type Props = {
  params: {
    animalId: string;
  };
  searchParams: {
    firstName: string;
    type: string;
    accessory: string;
    birthDate: Date;
  };
};

export default async function NaiveAnimalUpdatePage(props: Props) {
  const animal = await updateAnimalById(
    Number(props.params.animalId),
    props.searchParams.firstName,
    props.searchParams.type,
    new Date(props.searchParams.birthDate),
    props.searchParams.accessory,
  );

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} updated with new name {animal.firstName}
    </div>
  );
}
