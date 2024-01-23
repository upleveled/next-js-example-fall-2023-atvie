import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createNote } from '../../../database/notes';
import { getValidSessionByToken } from '../../../database/sessions';

const noteSchema = z.object({
  userId: z.number(),
  title: z.string().min(3).max(100),
  textContent: z.string().min(3),
});

export type CreateNoteResponseBodyPost =
  | {
      note: { textContent: string };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateNoteResponseBodyPost>> {
  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate the data
  const result = noteSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }

  // 3. Create the note
  const newNote = await createNote(
    result.data.userId,
    result.data.title,
    result.data.textContent,
  );

  // 4. If the note creation fails, return an error

  if (!newNote) {
    return NextResponse.json(
      {
        errors: [{ message: 'Note creation failed' }],
      },
      { status: 500 },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    note: { textContent: newNote.textContent },
  });
}
