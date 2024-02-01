import { notFound } from 'next/navigation';
import { deleteAnimalByIdInsecure } from '../../../../database/animals';

export const metadata = {
  title: 'Naive delete animal page',
};

type Props = {
  params: {
    animalId: string;
  };
};

export default async function DeleteAnimalPage(props: Props) {
  const animal = await deleteAnimalByIdInsecure(Number(props.params.animalId));

  if (!animal) {
    notFound();
  }
  return (
    <div>
      Animal with id {animal.id} and first name {animal.firstName} Deleted
    </div>
  );
}
