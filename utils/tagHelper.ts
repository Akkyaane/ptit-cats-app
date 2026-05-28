import IAnimal from "@/interfaces/IAnimal";

export default function buildTags(
  animals: IAnimal[],
  attributes: Record<string, string>,
) {
  const tags = [];

  animals.some((a) => a.isAtypical) ? tags.push("Atypique") : null;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "age") {
      const number = parseInt(value, 10);

      number < 1 ? tags.push("Chaton") : null;

      number >= 10 ? tags.push("Senior") : null;
    }
  });

  return tags;
}
