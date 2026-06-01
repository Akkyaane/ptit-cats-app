import IAnimal from "@/interfaces/IAnimal";

export default function buildTags(
  animals: IAnimal[],
  attributes: Record<string, string>,
) {
  const tags = [];

  animals.some((a) => a.isAtypical) ? tags.push("Atypique") : null;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "age") {
      !value.includes("an") && !value.includes("ans") ? tags.push("Chaton") : null;

      value.includes("ans") && parseInt(value, 10) >= 10 ? tags.push("Senior") : null;
    }
  });

  return tags;
}
