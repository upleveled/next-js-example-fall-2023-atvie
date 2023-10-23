export function formatDate(
  date: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  return date.toLocaleDateString(locale, options);
}

export function calculateDaysUntilNextBirthday(
  currentDate: Date,
  birthDate: Date,
) {
  if (!(currentDate instanceof Date && birthDate instanceof Date)) {
    throw new Error('Pass only dates!');
  }
  const birthDateThisYear = new Date(birthDate);
  birthDateThisYear.setFullYear(currentDate.getFullYear());

  const daysDifference = Math.ceil(
    (birthDateThisYear.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return Math.abs(daysDifference < 0 ? daysDifference + 365 : daysDifference);
}
