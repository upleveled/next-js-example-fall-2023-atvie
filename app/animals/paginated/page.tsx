import { getAnimalsWithLimitAndOffsetInsecure } from '../../../database/animals';
import Dashboard from './Dashboard';

export default async function AnimalsPaginatedPage() {
  const animals = await getAnimalsWithLimitAndOffsetInsecure(2, 0);

  return <Dashboard animals={animals} />;
}
