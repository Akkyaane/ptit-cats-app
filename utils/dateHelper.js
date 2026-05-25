export function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const diffInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
  const diffInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
  let diffInYears = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    diffInYears--;
  }

  if (diffInYears >= 1) {
    return `${diffInYears} ${diffInYears > 1 ? 'ans' : 'an'}`;
  } 
  else if (diffInMonths >= 1) {
    return `${diffInMonths} mois`;
  } 
  else {
    const weeks = Math.floor(diffInDays / 7);

    if (weeks >= 1) {
      return `${weeks} ${weeks > 1 ? 'semaines' : 'semaine'}`;
    }

    return "Nouveau-né";
  }
}