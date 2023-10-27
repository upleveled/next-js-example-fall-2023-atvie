'use client';
import { useState } from 'react';
import { Animal } from '../../migrations/00000-createTableAnimal';

type Props = {
  animals: Animal[];
};

export default function AnimalsForm({ animals }: Props) {
  const [animalList, setAnimalList] = useState(animals);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');
  const [birthDateInput, setBirthDateInput] = useState('');

  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditTypeInput, setOnEditTypeInput] = useState('');
  const [onEditAccessoryInput, setOnEditAccessoryInput] = useState('');
  const [onEditBirthDateInput, setOnEditBirthDateInput] = useState('');

  async function createAnimal() {
    const response = await fetch('/api/animals', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameInput,
        type: typeInput,
        accessory: accessoryInput,
        birthDate: new Date(birthDateInput),
      }),
    });

    const data = await response.json();

    setAnimalList([...animalList, data.animal]);
  }

  async function updateAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        type: onEditTypeInput,
        accessory: onEditAccessoryInput,
        birthDate: new Date(onEditBirthDateInput),
      }),
    });

    const data = await response.json();

    setAnimalList(
      animalList.map((animal) => {
        if (animal.id === data.animal.id) {
          return data.animal;
        }
        return animal;
      }),
    );
  }

  async function deleteAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setAnimalList(animalList.filter((animal) => animal.id !== data.animal.id));
  }

  return (
    <>
      <div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await createAnimal();
          }}
        >
          <label>
            First Name:
            <input
              value={firstNameInput}
              onChange={(event) => setFirstNameInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Type:
            <input
              value={typeInput}
              onChange={(event) => setTypeInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Accessory:
            <input
              value={accessoryInput}
              onChange={(event) => setAccessoryInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Birth date:
            <input
              type="date"
              value={birthDateInput}
              onChange={(event) => setBirthDateInput(event.currentTarget.value)}
            />
          </label>
          <br />
          <button>Create +</button>
        </form>
      </div>
      <br />
      <>
        {animalList.map((animal) => {
          return (
            <div key={`animal-inputs-${animal.id}`}>
              <input
                value={
                  animal.id !== onEditId
                    ? animal.firstName
                    : onEditFirstNameInput
                }
                onChange={(event) =>
                  setOnEditFirstNameInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              <input
                value={animal.id !== onEditId ? animal.type : onEditTypeInput}
                onChange={(event) =>
                  setOnEditTypeInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              <input
                value={
                  animal.id !== onEditId
                    ? animal.accessory || ''
                    : onEditAccessoryInput
                }
                onChange={(event) =>
                  setOnEditAccessoryInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              <input
                type="date"
                value={
                  animal.id !== onEditId
                    ? new Date(animal.birthDate).toISOString().split('T')[0]
                    : onEditBirthDateInput
                }
                onChange={(event) =>
                  setOnEditBirthDateInput(event.currentTarget.value)
                }
                disabled={animal.id !== onEditId}
              />
              {onEditId === animal.id ? (
                <button
                  onClick={async () => {
                    await updateAnimalById(animal.id);
                    setOnEditId(0);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOnEditFirstNameInput(animal.firstName);
                    setOnEditTypeInput(animal.type);
                    setOnEditAccessoryInput(animal.accessory || '');
                    setOnEditBirthDateInput(animal.birthDate.toLocaleString());
                    setOnEditId(animal.id);
                  }}
                >
                  Edit
                </button>
              )}
              <button onClick={async () => await deleteAnimalById(animal.id)}>
                Delete
              </button>
            </div>
          );
        })}
      </>
    </>
  );
}
