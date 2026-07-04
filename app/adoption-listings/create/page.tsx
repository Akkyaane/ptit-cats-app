"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnimalDraft,
  defaultAnimalDraft,
} from "@/components/adoptionListing/AnimalFormFields";
import ALForm, {
  AnimalEntry,
  ListingDraft,
} from "@/components/adoptionListing/ALForm";
import IAnimalRequirement from "@/interfaces/IAnimalRequirement";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";
import Breadcrumb from "@/components/Breadcrumb";
import Heading from "@/components/ui/Heading";

function defaultListing(): ListingDraft {
  return {
    title: "",
    slogan: "",
    shortDescription: "",
    longDescription: "",
    price: 0,
    newMediaFiles: [],
    existingMedia: [],
  };
}

async function fetchAnimalRequirements(): Promise<IAnimalRequirement[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animal-requirements/`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`[animal-requirements] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function fetchPersonalityTraits(): Promise<IAnimalPersonalityTrait[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animal-personality-traits/`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`[animal-personality-traits] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function createAnimal(animal: AnimalDraft): Promise<string> {
  const payload = {
    name: animal.name,
    sex: animal.sex,
    ...(animal.birthDate ? { birthDate: animal.birthDate } : {}),
    isDewormed: animal.isDewormed,
    isVaccinated: animal.isVaccinated,
    isSterilizedOrCastrated: animal.isSterilizedOrCastrated,
    isIdentified: animal.isIdentified,
    isAtypical: animal.isAtypical,
    dogAffinity: animal.dogAffinity,
    catAffinity: animal.catAffinity,
    childAffinity: animal.childAffinity,
    livingEnvironmentType: animal.livingEnvironmentType,
    entityStatus: animal.entityStatus,
    animal_requirements: animal.animal_requirements.map((r) => r.documentId),
    animal_personality_traits: animal.animal_personality_traits.map(
      (t) => t.documentId,
    ),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animals/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error(`[animals/create] ${res.status} - ${await res.text()}`);
  }

  const data = await res.json();
  return data.data.documentId as string;
}

async function uploadMedia(files: File[]): Promise<number[]> {
  if (files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.data as { id: number }[]).map((f) => f.id);
}

async function createAdoptionListing(
  listing: ListingDraft,
  animalDocumentIds: string[],
  isDuo: boolean,
  mediaIds: number[],
): Promise<void> {
  const payload = {
    title: listing.title,
    ...(listing.slogan ? { slogan: listing.slogan } : {}),
    shortDescription: listing.shortDescription,
    longDescription: listing.longDescription,
    price: listing.price,
    isDuo,
    animals: animalDocumentIds,
    media: mediaIds,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    throw new Error(
      `[adoption-listings/create] ${res.status} - ${await res.text()}`,
    );
  }
}

export default function CreateAdoptionListing() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [isDuo, setIsDuo] = useState(false);
  const [animals, setAnimals] = useState<AnimalEntry[]>([
    { ...defaultAnimalDraft(), _key: crypto.randomUUID() },
  ]);
  const [listing, setListing] = useState<ListingDraft>(defaultListing());
  const [requirements, setRequirements] = useState<IAnimalRequirement[]>([]);
  const [traits, setTraits] = useState<IAnimalPersonalityTrait[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchAnimalRequirements(), fetchPersonalityTraits()])
      .then(([reqs, trts]) => {
        setRequirements(reqs);
        setTraits(trts);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : String(err)),
      );
  }, []);

  const toggleDuo = (checked: boolean) => {
    setIsDuo(checked);
    if (checked && animals.length < 2) {
      setAnimals((prev) => [
        ...prev,
        { ...defaultAnimalDraft(), _key: crypto.randomUUID() },
      ]);
    } else if (!checked && animals.length > 1) {
      setAnimals((prev) => [prev[0]]);
    }
  };

  const updateAnimal = (key: string, data: Partial<AnimalDraft>) => {
    setAnimals((prev) =>
      prev.map((a) => (a._key === key ? { ...a, ...data } : a)),
    );
  };

  const handleListingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target;
    setListing((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setListing((prev) => ({
        ...prev,
        newMediaFiles: Array.from(e.target.files!),
      }));
    }
  };

  const handleRemoveNewFile = (index: number) => {
    setListing((prev) => ({
      ...prev,
      newMediaFiles: prev.newMediaFiles.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveExistingMedia = (id: number) => {
    setListing((prev) => ({
      ...prev,
      existingMedia: prev.existingMedia.filter((m) => m.id !== id),
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const animalDocumentIds: string[] = [];
      for (const { _key: _, ...draft } of animals) {
        const documentId = await createAnimal(draft);
        animalDocumentIds.push(documentId);
      }

      const mediaIds = await uploadMedia(listing.newMediaFiles);

      await createAdoptionListing(listing, animalDocumentIds, isDuo, mediaIds);

      router.push("/adoption-listings");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="layout-header-spacing">
      <div className="container">
        <Breadcrumb />
        <header>
          <Heading type="h2" headingVariant="quaternary">
            Créer une annonce
          </Heading>
        </header>

        <ALForm
          step={step}
          setStep={setStep}
          isDuo={isDuo}
          toggleDuo={toggleDuo}
          animals={animals}
          updateAnimal={updateAnimal}
          requirements={requirements}
          traits={traits}
          listing={listing}
          onListingChange={handleListingChange}
          onFilesChange={handleFilesChange}
          onRemoveNewFile={handleRemoveNewFile}
          onRemoveExistingMedia={handleRemoveExistingMedia}
          onSubmit={handleSubmit}
          isSaving={isLoading}
          error={error}
          backHref="/adoption-listings"
        />
      </div>
    </div>
  );
}
