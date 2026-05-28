import IAnimal from "@/interfaces/IAnimal";
import calculateAge from "./dateHelper";

export default function buildAttributes(animals: IAnimal[]) {
  const attributes: Record<string, string> = {};
  const ages = animals
    .filter(
      (a): a is IAnimal & { birthDate: Date } => a.birthDate !== undefined,
    )
    .map((a) => calculateAge(new Date(a.birthDate)))
    .join(" | ");

  const sexes = animals
    .map((animal) => (animal.sex === "male" ? "M" : "F"))
    .join(" | ");

  if (ages) {
    attributes.age = ages;
  }

  attributes.sex = sexes;

  return attributes;
}
