export function formatDate(date: Date) {
  return date.toLocaleDateString('de-AT');
}

export function calculateDaysUntilBirthday(currentDate: Date, birthDate: Date) {
  const today = new Date();
  const birthday = new Date(birthDate);

  const nextBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const daysUntilBirthday = Math.ceil(
    (nextBirthday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysUntilBirthday;
}
