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
  const [draft, setDraft] = useState({
    id: 0,
    firstName: '',
    type: '',
    accessory: '',
    birthDate: new Date(),
  });

  async function updateAnimalById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: draft.firstName,
        type: draft.type,
        accessory: draft.accessory,
        birthDate: draft.birthDate,
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
            value={animal.id !== draft.id ? animal.firstName : draft.firstName}
            onChange={(event) =>
              setDraft({ ...draft, firstName: event.currentTarget.value })
            }
            disabled={animal.id !== draft.id}
          />
          <input
            value={animal.id !== draft.id ? animal.type : draft.type}
            onChange={(event) =>
              setDraft({ ...draft, type: event.currentTarget.value })
            }
            disabled={animal.id !== draft.id}
          />
          <input
            value={
              animal.id !== draft.id ? animal.accessory || '' : draft.accessory
            }
            onChange={(event) =>
              setDraft({ ...draft, accessory: event.currentTarget.value })
            }
            disabled={animal.id !== draft.id}
          />
          <input
            type="date"
            value={dayjs(
              animal.id !== draft.id ? animal.birthDate : draft.birthDate,
            ).format('YYYY-MM-DD')}
            onChange={(event) =>
              setDraft({
                ...draft,
                birthDate: new Date(event.currentTarget.value),
              })
            }
            disabled={animal.id !== draft.id}
          />
          {draft.id === animal.id ? (
            <button
              onClick={async () => {
                await updateAnimalById(animal.id);
                setDraft({ ...draft, id: 0 });
              }}
            >
              Save
            </button>
          ) : (
            <button
              onClick={() =>
                setDraft({
                  id: animal.id,
                  firstName: animal.firstName,
                  type: animal.type,
                  accessory: animal.accessory || '',
                  birthDate: animal.birthDate,
                })
              }
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
