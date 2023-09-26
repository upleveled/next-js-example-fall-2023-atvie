import 'server-only';

const animals = [
  { id: 1, firstName: 'lucia', type: 'Lion', accessory: 'Car' },
  { id: 2, firstName: 'macca', type: 'Dog', accessory: 'Comb' },
  { id: 3, firstName: 'jojo', type: 'Dodo', accessory: 'Dojo' },
  { id: 4, firstName: 'flo', type: 'Parrot', accessory: 'carrot' },
  { id: 5, firstName: 'bili', type: 'Capybara', accessory: 'Pen' },
];

export function getAnimals() {
  return animals;
}

export function getAnimal(id) {
  return animals.find((animal) => animal.id === id);
}
