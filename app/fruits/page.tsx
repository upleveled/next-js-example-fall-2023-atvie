import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

// export const fruits = [
//   { id: 1, name: 'Apple', icon: '🍎' },
//   { id: 2, name: 'Banana', icon: '🍌' },
//   { id: 3, name: 'Kiwi', icon: '🥝' },
//   { id: 4, name: 'Strawberry', icon: '🍓' },
//   { id: 5, name: 'Orange', icon: '🍊' },
//   { id: 6, name: 'Melon', icon: '🍉' },
// ];

// cookie = [
//   { id: 1, comment: 'this is my apple comment' },
//   { id: 2, comment: 'abc' },
//   { id: 6, comment: 'new test' }
// ]

export default function FruitsPage() {
  const fruitsCommentsCookie = getCookie('fruitsComments');

  const fruitComments = !fruitsCommentsCookie
    ? []
    : parseJson(fruitsCommentsCookie);

  console.log(fruitComments);

  const fruitsWithComments = fruits.map((fruit) => {
    const matchingWithFruitFromCookie = fruitComments?.find(
      (fruitObject) => fruit.id === fruitObject.id,
    );
    return { ...fruit, comment: matchingWithFruitFromCookie?.comment };
  });

  return (
    <div>
      {fruitsWithComments.map((fruit) => {
        return (
          <div key={`fruit-${fruit.id}`}>
            <Link href={`/fruits/${fruit.id}`}>
              <h1>
                {fruit.icon} {fruit.name}
              </h1>
            </Link>
            {fruit.comment}
          </div>
        );
      })}
    </div>
  );
}
