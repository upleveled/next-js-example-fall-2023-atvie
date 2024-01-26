'use client';

import { useState } from 'react';
import { createOrUpdateComment } from './actions';

type Props = {
  fruitId: number;
};

export default function FruitCommentForm(props: Props) {
  const [comment, setComment] = useState('');

  // In case you want to move out the event handler function,
  // you need to type the parameter like so:
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   setComment(event.currentTarget.value);
  // }

  return (
    <form>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
        // onChange={handleChange}
      />
      <button
        formAction={async () =>
          await createOrUpdateComment(props.fruitId, comment)
        }
      >
        Add comment
      </button>
    </form>
  );
}
