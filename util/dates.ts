export function formatDate(
  date: Date,
  locale: string = 'en-GB',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
) {
  if (!(date instanceof Date)) {
    throw new Error('Pass only dates!');
  }
  return date.toLocaleDateString(locale, options);
}

export function getDaysUntilNextBirthday(currentDate: Date, birthDate: Date) {
  if (!(currentDate instanceof Date) || !(birthDate instanceof Date)) {
    throw new Error('Pass only dates!');
  }

  if (birthDate.getTime() > currentDate.getTime()) {
    throw new Error('Birth date must be before current date!');
  }

  // Create new date objects to avoid `.setUTCHours()` and `.setUTCFullYear()`
  // changing the dates in the `currentDate` and `birthDate` arguments passed
  // in to the function (aka "avoid mutation")
  const startOfCurrentDate = new Date(currentDate);
  const nextBirthDate = new Date(birthDate);

  // Set UTC time to 0 to compare only days (avoid time zones)
  startOfCurrentDate.setUTCHours(0, 0, 0, 0);
  nextBirthDate.setUTCHours(0, 0, 0, 0);

  nextBirthDate.setUTCFullYear(currentDate.getFullYear());

  if (nextBirthDate.getTime() < startOfCurrentDate.getTime()) {
    nextBirthDate.setUTCFullYear(startOfCurrentDate.getFullYear() + 1);
  }

  const daysUntilNextBirthday =
    (nextBirthDate.getTime() - startOfCurrentDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return daysUntilNextBirthday;
}
