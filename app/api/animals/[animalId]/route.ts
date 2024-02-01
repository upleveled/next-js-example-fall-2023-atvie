import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteAnimal,
  getAnimalInsecure,
  updateAnimal,
} from '../../../../database/animals';
import { Animal } from '../../../../migrations/00000-createTableAnimal';
import { Error } from '../route';

type AnimalResponseBodyGet = { animal: Animal } | Error;
type AnimalResponseBodyPut = { animal: Animal } | Error;
type AnimalResponseBodyDelete = { animal: Animal } | Error;

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
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyGet>> {
  console.log(params);
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const animal = await getAnimalInsecure(animalId);

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: animal });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyPut>> {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  // zod please verify the body matches my schema
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

  // query the database to update the animal
  const animal =
    sessionTokenCookie &&
    (await updateAnimal(sessionTokenCookie.value, {
      id: animalId,
      firstName: result.data.firstName,
      type: result.data.type,
      accessory: result.data.accessory || null,
      birthDate: result.data.birthDate,
    }));

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Error updating the animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const sessionTokenCookie = cookies().get('sessionToken');

  const animal =
    sessionTokenCookie &&
    (await deleteAnimal(sessionTokenCookie.value, animalId));

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Error deleting the animal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    animal: animal,
  });
}
