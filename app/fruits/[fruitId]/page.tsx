import { notFound } from 'next/navigation';
import { getFruitById } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';
import FruitCommentForm from './FruitCommentForm';

type Props = {
  params: {
    fruitId: string;
  };
};

export default function SingleFruitPage(props: Props) {
  const fruit = getFruitById(Number(props.params.fruitId));

  if (!fruit) {
    notFound();
  }

  const fruitsCommentsCookie = getCookie('fruitsComments');

  const fruitComments = !fruitsCommentsCookie
    ? []
    : parseJson(fruitsCommentsCookie);

  // Alternative to always have an array type
  // : parseJson(fruitsCommentsCookie) || [];

  const fruitCommentToDisplay = fruitComments?.find((fruitComment) => {
    return fruitComment.id === fruit.id;
  });

  return (
    <div>
      <h1>
        {fruit.icon} {fruit.name}
      </h1>
      <div>{fruitCommentToDisplay?.comment}</div>
      <FruitCommentForm fruitId={fruit.id} />
    </div>
  );
}
