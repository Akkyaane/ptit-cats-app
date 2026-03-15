export function calculateAge(birthdateString) {
  const birthdate = new Date(birthdateString);

  const today = new Date();

  const diffInMs = today - birthdate;

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const diffInMonths = (today.getFullYear() - birthdate.getFullYear()) * 12 + (today.getMonth() - birthdate.getMonth());
  
  let diffInYears = today.getFullYear() - birthdate.getFullYear();

  const m = today.getMonth() - birthdate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
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