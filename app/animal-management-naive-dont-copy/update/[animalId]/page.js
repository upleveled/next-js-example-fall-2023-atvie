import { notFound } from 'next/navigation';
import { updateAnimalById } from '../../../../database/animals';

export default async function NaiveAnimalUpdatePage(props) {
  const animal = await updateAnimalById(
    props.params.animalId,
    props.searchParams.firstName,
    props.searchParams.type,
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
