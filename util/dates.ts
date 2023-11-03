export function formatDate(
  date: Date,
  locale: string = 'en-GB',
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

export function getDaysUntilNextBirthday(currentDate: Date, birthDate: Date) {
  if (!(currentDate instanceof Date && birthDate instanceof Date)) {
    throw new Error('Pass only dates!');
  }

  if (birthDate.getTime() > currentDate.getTime()) {
    throw new Error('Birth date must be before current date!');
  }

  birthDate.setFullYear(currentDate.getFullYear());

  if (birthDate.getTime() < currentDate.getTime()) {
    birthDate.setFullYear(currentDate.getFullYear() + 1);
  }

  const daysUntilNextBirthday =
    birthDate.getDate() === currentDate.getDate() &&
    birthDate.getMonth() === currentDate.getMonth()
      ? 0
      : Math.ceil(
          (birthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
        );

  return daysUntilNextBirthday;
}