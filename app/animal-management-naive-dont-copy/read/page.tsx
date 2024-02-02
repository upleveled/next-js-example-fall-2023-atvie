import Image from 'next/image';
import Link from 'next/link';
import { getAnimalsInsecure } from '../../../database/animals';

export const metadata = {
  title: 'Naive Animals page',
  description: 'Generated by create next app',
};

export default async function NaiveAnimalsPage() {
  const animals = await getAnimalsInsecure();

  return (
    <div>
      <h1>These are my animals</h1>

      {animals.map((animal) => {
        return (
          <div key={`animal-div-${animal.id}`}>
            <Link href={`/animal-management-naive-dont-copy/read/${animal.id}`}>
              {animal.firstName}
            </Link>
            <Image
              src={`/images/${animal.firstName.toLowerCase()}.png`}
              alt={animal.firstName}
              width={200}
              height={200}
            />
          </div>
        );
      })}
    </div>
  );
}
