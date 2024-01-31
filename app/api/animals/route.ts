import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createAnimalBySessionToken,
  getAnimalsWithLimitAndOffset,
} from '../../../database/animals';
import { Animal } from '../../../migrations/00000-createTableAnimal';

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
  // The `birthDate` is received as a string from the client side. Zod, with
  // `z.coerce.date()`, automatically converts any input value to a Date object
  // before validation. If the conversion encounters issues (e.g., invalid
  // format), an error will be thrown
  birthDate: z.coerce.date(),
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

  const sessionTokenCookie = cookies().get('sessionToken');

  // Get the animals from the database
  const animal =
    sessionTokenCookie &&
    (await createAnimalBySessionToken(sessionTokenCookie.value, {
      firstName: result.data.firstName,
      type: result.data.type,
      accessory: result.data.accessory || null,
      birthDate: result.data.birthDate,
    }));

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
