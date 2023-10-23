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
  const birthDateThisYear = new Date(birthDate);
  birthDateThisYear.setFullYear(currentDate.getFullYear());

  const daysDifference = Math.ceil(
    (birthDateThisYear.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (daysDifference === -0) {
    return 0;
  }

  return daysDifference < 0 ? daysDifference + 365 : daysDifference;
}
