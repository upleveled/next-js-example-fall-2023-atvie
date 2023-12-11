'use client';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Animal } from '../../migrations/00000-createTableAnimal';

type Props = {
  animals: Animal[];
};

export default function AnimalsForm({ animals }: Props) {
  const [animalList, setAnimalList] = useState(animals);
  const [firstName, setFirstName] = useState('');
  const [type, setType] = useState('');
  const [accessory, setAccessory] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());

  async function createAnimal() {
    const response = await fetch('/api/animals', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        type,
        accessory,
        birthDate,
      }),
    });

    const data = await response.json();

    setAnimalList([...animalList, data.animal]);
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
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Type:
            <input
              value={type}
              onChange={(event) => setType(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Accessory:
            <input
              value={accessory}
              onChange={(event) => setAccessory(event.currentTarget.value)}
            />
          </label>
          <br />
          <label>
            Birth date:
            <input
              type="date"
              // use dayjs to format the date to YYYY-MM-DD
              // to display the date in the input field
              value={dayjs(birthDate).format('YYYY-MM-DD')}
              onChange={(event) =>
                setBirthDate(new Date(event.currentTarget.value))
              }
            />
          </label>
          <br />
          <button>Create +</button>
        </form>
      </div>
      <br />
      <AnimalsListForm animalList={animalList} setAnimalList={setAnimalList} />
    </>
  );
}

function AnimalsListForm({
  animalList,
  setAnimalList,
}: {
  animalList: Animal[];
  setAnimalList: (animalList: Animal[]) => void;
}) {
  const [idDraft, setIdDraft] = useState(0);
  const [firstNameDraft, setFirstNameDraft] = useState('');
  const [typeDraft, setTypeDraft] = useState('');
  const [accessoryDraft, setAccessoryDraft] = useState('');
  const [birthDateDraft, setBirthDateDraft] = useState(new Date());

  async function updateAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: firstNameDraft,
        type: typeDraft,
        accessory: accessoryDraft,
        birthDate: birthDateDraft,
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {animalList.map((animal) => (
        <div key={`animal-inputs-${animal.id}`}>
          <input
            value={animal.id !== idDraft ? animal.firstName : firstNameDraft}
            onChange={(event) => setFirstNameDraft(event.currentTarget.value)}
            disabled={animal.id !== idDraft}
          />
          <input
            value={animal.id !== idDraft ? animal.type : typeDraft}
            onChange={(event) => setTypeDraft(event.currentTarget.value)}
            disabled={animal.id !== idDraft}
          />
          <input
            value={
              animal.id !== idDraft ? animal.accessory || '' : accessoryDraft
            }
            onChange={(event) => setAccessoryDraft(event.currentTarget.value)}
            disabled={animal.id !== idDraft}
          />
          <input
            type="date"
            value={dayjs(
              animal.id !== idDraft ? animal.birthDate : birthDateDraft,
            ).format('YYYY-MM-DD')}
            onChange={(event) =>
              setBirthDateDraft(new Date(event.currentTarget.value))
            }
            disabled={animal.id !== idDraft}
          />
          {idDraft === animal.id ? (
            <button
              onClick={async () => {
                await updateAnimalById(animal.id);
                setIdDraft(0);
              }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setIdDraft(animal.id);
                setFirstNameDraft(animal.firstName);
                setTypeDraft(animal.type);
                setAccessoryDraft(animal.accessory || '');
                setBirthDateDraft(animal.birthDate);
              }}
            >
              Edit
            </button>
          )}
          <button onClick={async () => await deleteAnimalById(animal.id)}>
            Delete
          </button>
        </div>
      ))}
    </form>
  );
}
