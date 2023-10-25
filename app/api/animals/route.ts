import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createAnimal,
  getAnimalsWithLimitAndOffset,
} from '../../../database/animals';
import { getValidSessionByToken } from '../../../database/sessions';
import { Animal } from '../../../migrations/00000-createTableAnimal';
import { validateTokenAgainstSecret } from '../../../util/csrf';

export type Error = {
  error: string;
};

type AnimalsResponseBodyGet =
  | {
      animals: Animal[];
    }
  | Error;

type AnimalsResponseBodyPost =
  | {
      animal: Animal;
    }
  | Error;

const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
  csrfToken: z.string(),
});

export async function GET(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyGet>> {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
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
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  // query the database to get all the animals only if a valid session token is passed
  const animals = await getAnimalsWithLimitAndOffset(limit, offset);

  return NextResponse.json({
    animals: animals,
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  const body = await request.json();

  const result = animalSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
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
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  const isValidCsrfToken = validateTokenAgainstSecret(
    session.csrfSecret!,
    result.data.csrfToken,
  );

  if (!isValidCsrfToken) {
    return NextResponse.json(
      {
        error: 'session token is not valid',
      },
      { status: 401 },
    );
  }

  // Get the animals from the database
  const animal = await createAnimal(
    result.data.firstName,
    result.data.type,
    result.data.accessory,
  );

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Error creating the new animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}
