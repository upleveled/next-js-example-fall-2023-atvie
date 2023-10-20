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
  const currentYear = currentDate.getFullYear();
  const birthDateThisYear = new Date(birthDate);
  birthDateThisYear.setFullYear(currentYear);

  const daysDifference = birthDateThisYear.getTime() - currentDate.getTime();
  const days = Math.ceil(daysDifference / (1000 * 60 * 60 * 24));

  return days < 0 ? days + 365 : days;
}
