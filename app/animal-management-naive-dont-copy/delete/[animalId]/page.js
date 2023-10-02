import { notFound } from 'next/navigation';
import { deleteAnimalById } from '../../../../database/animals';

export const metadata = {
  title: 'Naive delete animal page',
};

export default async function DeleteAnimalPage(props) {
  const animal = await deleteAnimalById(props.params.animalId);

  if (!animal) {
    notFound();
  }
  return (
    <div>
      Animal with id {animal.id} and first name {animal.firstName} Deleted
    </div>
  );
}
