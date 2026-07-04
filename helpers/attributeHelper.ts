import IAnimal from "@/interfaces/IAnimal";
import calculateAge from "./dateHelper";

export default function buildAttributes(animals: IAnimal[]) {
  const attributes: Record<string, string> = {};

  const ages = animals
    .filter(
      (a): a is IAnimal & { birthDate: Date } => a.birthDate !== undefined,
    )
    .map((a) => calculateAge(new Date(a.birthDate)));

  const agesFormatted = [...new Set(ages)].join(" | ");

  const sexes = animals.map((animal) => (animal.sex === "male" ? "M" : "F"));

  const sexesFormatted = [...new Set(sexes)].join(" | ");

  if (ages) {
    attributes.age = agesFormatted;
  }

  attributes.sex = sexesFormatted;

  return attributes;
}
