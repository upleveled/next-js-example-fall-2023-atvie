'use client';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Animal } from '../../migrations/00000-createTableAnimal';
import styles from './AnimalsForm.module.scss';

type Props = {
  animals: Animal[];
};

export default function AnimalsForm(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [type, setType] = useState('');
  const [accessory, setAccessory] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const router = useRouter();

  function resetFormStates() {
    setIsEditing(false);
    setSelectedId(0);
    setId(0);
    setFirstName('');
    setType('');
    setAccessory('');
    setBirthDate(new Date());
  }

  function handleRowClick(animalId: number) {
    if (selectedId === animalId) {
      resetFormStates();
    } else {
      setSelectedId(animalId);
      setIsEditing(true);

      const selectedAnimal = props.animals.find(
        (animal) => animal.id === animalId,
      );

      if (selectedAnimal) {
        setId(selectedAnimal.id);
        setFirstName(selectedAnimal.firstName);
        setType(selectedAnimal.type);
        setAccessory(selectedAnimal.accessory || '');
        setBirthDate(selectedAnimal.birthDate);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
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
                className={selectedId === animal.id ? styles.selectedRow : ''}
                onClick={() => handleRowClick(animal.id)}
              >
                <td>{animal.firstName}</td>
                <td>{animal.type}</td>
                <td>{animal.accessory}</td>
                <td>{dayjs(animal.birthDate).format('YYYY-MM-DD')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.editContainer}>
        <h2>{isEditing ? 'Edit Animal' : 'Add Animal'}</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label>
            Name
            <input
              placeholder="Name"
              onChange={(event) => setFirstName(event.currentTarget.value)}
              value={firstName}
            />
          </label>
          <label>
            Type
            <input
              placeholder="Type"
              onChange={(event) => setType(event.currentTarget.value)}
              value={type}
            />
          </label>
          <label>
            Accessory
            <input
              placeholder="Accessory"
              onChange={(event) => setAccessory(event.currentTarget.value)}
              value={accessory}
            />
          </label>
          <label>
            Birth Date
            <input
              type="date"
              placeholder="Date"
              value={dayjs(birthDate).format('YYYY-MM-DD')}
              onChange={(event) =>
                setBirthDate(new Date(event.currentTarget.value))
              }
            />
          </label>
          {isEditing ? (
            <div className={styles.buttonContainer}>
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
              <button
                className={styles.button}
                onClick={async () => {
                  await fetch(`/api/animals/${id}`, {
                    method: 'DELETE',
                  });
                  resetFormStates();
                  router.refresh();
                }}
              >
                Delete
              </button>
            </div>
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
  );
}
