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

  // Set UTC time to 0 to compare only days (avoid time zones)
  currentDate.setUTCHours(0, 0, 0, 0);
  birthDate.setUTCHours(0, 0, 0, 0);

  birthDate.setUTCFullYear(currentDate.getFullYear());

  if (birthDate.getTime() < currentDate.getTime()) {
    birthDate.setUTCFullYear(currentDate.getFullYear() + 1);
  }

  const daysUntilNextBirthday =
    (birthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

  return daysUntilNextBirthday;
}
