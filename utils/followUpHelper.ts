import IAnimal from "@/interfaces/IAnimal";

export default function buildFollowUp(animals: IAnimal[], isDuo: boolean) {
  const followUp: string[] = [];

  const fields: {
    key: keyof IAnimal;
    plural: string;
    singular: string;
  }[] = [
    { key: "isDewormed", plural: "✓ Déparasités", singular: "✓ Déparasité" },
    { key: "isVaccinated", plural: "✓ Vaccinés", singular: "✓ Vacciné" },
    {
      key: "isSterilizedOrCastrated",
      plural: "✓ Stérilisés / Castrés",
      singular: "✓ Stérilisé / Castré",
    },
    { key: "isIdentified", plural: "✓ Identifiés", singular: "✓ Identifié" },
  ];

  fields.forEach(({ key, plural, singular }) => {
    if (animals.every((animal) => animal?.[key])) {
      followUp.push(isDuo ? plural : singular);
    }
  });

  return followUp;
}
