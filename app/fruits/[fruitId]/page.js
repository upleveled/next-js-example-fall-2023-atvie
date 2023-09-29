import { getFruitById } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';
import FruitCommentForm from './FruitCommentForm';

export default function SingleFruitPage(props) {
  const fruit = getFruitById(Number(props.params.fruitId));
  const fruitsCommentsCookie = getCookie('fruitsComments');

  const fruitComments = !fruitsCommentsCookie
    ? []
    : parseJson(fruitsCommentsCookie);

  const fruitCommentToDisplay = fruitComments.find((fruitComment) => {
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
