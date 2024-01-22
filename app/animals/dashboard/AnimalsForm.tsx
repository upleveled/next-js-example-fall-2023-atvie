'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Animal } from '../../../migrations/00000-createTableAnimal';
import styles from './AnimalsForm.module.scss';

type Props = {
  animals: Animal[];
};

export default function AnimalsForm(props: Props) {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [type, setType] = useState('');
  const [accessory, setAccessory] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());

  const router = useRouter();

  function resetFormStates() {
    setId(0);
    setFirstName('');
    setType('');
    setAccessory('');
    setBirthDate(new Date());
  }

  return (
    <>
      <h1>Animal Dashboard</h1>
      <div className={styles.dashboard}>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Accessory</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {props.animals.map((animal) => (
                <tr
                  key={`animal-${animal.id}`}
                  className={id === animal.id ? styles.selectedItem : ''}
                >
                  <td>{animal.firstName}</td>
                  <td>{animal.type}</td>
                  <td>{animal.accessory}</td>
                  <td>{dayjs(animal.birthDate).format('YYYY-MM-DD')}</td>
                  <td className={styles.buttonCell}>
                    <button
                      onClick={() => {
                        setId(animal.id);
                        setFirstName(animal.firstName);
                        setType(animal.type);
                        setAccessory(animal.accessory || '');
                        setBirthDate(animal.birthDate);
                      }}
                      disabled={id === animal.id && true}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.button}
                      onClick={async () => {
                        await fetch(`/api/animals/${animal.id}`, {
                          method: 'DELETE',
                        });
                        resetFormStates();
                        router.refresh();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.animalForm}>
          <h2>{id ? 'Edit Animal' : 'Add Animal'}</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label>
              Name
              <input
                onChange={(event) => setFirstName(event.currentTarget.value)}
                value={firstName}
              />
            </label>
            <label>
              Type
              <input
                onChange={(event) => setType(event.currentTarget.value)}
                value={type}
              />
            </label>
            <label>
              Accessory
              <input
                onChange={(event) => setAccessory(event.currentTarget.value)}
                value={accessory}
              />
            </label>
            <label>
              Birth Date
              <input
                type="date"
                value={dayjs(birthDate).format('YYYY-MM-DD')}
                onChange={(event) =>
                  setBirthDate(new Date(event.currentTarget.value))
                }
              />
            </label>
            {id ? (
              <button
                className={styles.button}
                onClick={async () => {
                  await fetch(`/api/animals/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      firstName,
                      type,
                      accessory,
                      birthDate,
                    }),
                  });
                  resetFormStates();
                  router.refresh();
                }}
              >
                Save Changes
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={async () => {
                  await fetch('/api/animals', {
                    method: 'POST',
                    body: JSON.stringify({
                      firstName,
                      type,
                      accessory,
                      birthDate,
                    }),
                  });
                  resetFormStates();
                  router.refresh();
                }}
              >
                Add Animal
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
