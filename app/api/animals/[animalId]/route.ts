import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
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

  const animal = await getAnimalById(animalId);

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

  // query the database to update the animal
  const animal = await updateAnimalById(
    animalId,
    result.data.firstName,
    result.data.type,
    result.data.accessory,
  );

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

  const animal = await deleteAnimalById(animalId);

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
