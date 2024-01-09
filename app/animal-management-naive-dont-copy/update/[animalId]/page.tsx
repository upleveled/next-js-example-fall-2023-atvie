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
    birthDate: string;
  };
};

export default async function NaiveAnimalUpdatePage(props: Props) {
  const animal = await updateAnimalById({
    id: Number(props.params.animalId),
    firstName: props.searchParams.firstName,
    type: props.searchParams.type,
    accessory: props.searchParams.accessory || null,
    birthDate: new Date(props.searchParams.birthDate),
  });

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} updated with new name {animal.firstName}
    </div>
  );
}
