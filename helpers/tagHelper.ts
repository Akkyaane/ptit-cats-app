import IAnimal from "@/interfaces/IAnimal";

export default function buildTags(
  animals: IAnimal[],
  attributes: Record<string, string>,
  isDuo: boolean,
) {
  const tags = [];

  animals.some((a) => a.isAtypical) ? tags.push("Atypique") : null;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "age") {
      !value.includes("an") && !value.includes("ans") ? tags.push("Chaton") : null;

      value.includes("ans") && parseInt(value, 10) >= 10 ? tags.push("Senior") : null;
    }
  });

  isDuo ? tags.push("Duo") : null;

  return tags;
}
