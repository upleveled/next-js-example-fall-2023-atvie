export function formatDate(
  date: Date,
  locale: string = 'de-DE',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Pass only dates!');
  }
  return date.toLocaleDateString(locale, options);
}

export function daysUntilNextBirthday(currentDate: Date, birthDate: Date) {
  if (!(currentDate instanceof Date && birthDate instanceof Date)) {
    throw new Error('Pass only dates!');
  }

  if (birthDate.getTime() > currentDate.getTime()) {
    throw new Error('Birth date must be before current date!');
  }

  if (
    birthDate.getDate() === currentDate.getDate() &&
    birthDate.getMonth() === currentDate.getMonth()
  ) {
    return 0;
  }

  birthDate.setFullYear(currentDate.getFullYear());

  if (birthDate.getTime() < currentDate.getTime()) {
    birthDate.setFullYear(currentDate.getFullYear() + 1);
  }

  const daysDifference = Math.ceil(
    (birthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysDifference;
}
