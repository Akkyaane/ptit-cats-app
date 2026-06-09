"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeadingPrimary from "@/components/ui/HeadingPrimary";
import { AnimalDraft, defaultAnimalDraft } from "@/components/adoptionListing/AnimalFields";
import AdoptionListingForm, {
  AnimalEntry,
  ListingDraft,
} from "@/components/adoptionListing/ALForm";
import IAnimalRequirement from "@/interfaces/IAnimalRequirement";
import IAnimalPersonalityTrait from "@/interfaces/IAnimalPersonalityTrait";
import IAdoptionListing from "@/interfaces/IAdoptionListing";

// ─── helpers ──────────────────────────────────────────────────────────────────

function animalToEntry(animal: IAdoptionListing["animals"][number]): AnimalEntry {
  return {
    _key: crypto.randomUUID(),
    documentId: animal.documentId,
    name: animal.name ?? "",
    sex: animal.sex ?? "male",
    birthDate: animal.birthDate ?? "",
    isDewormed: animal.isDewormed ?? false,
    isVaccinated: animal.isVaccinated ?? false,
    isSterilizedOrCastrated: animal.isSterilizedOrCastrated ?? false,
    isIdentified: animal.isIdentified ?? false,
    isAtypical: animal.isAtypical ?? false,
    dogAffinity: animal.dogAffinity ?? "unknown",
    catAffinity: animal.catAffinity ?? "unknown",
    childAffinity: animal.childAffinity ?? "unknown",
    livingEnvironmentType: animal.livingEnvironmentType ?? "apartment",
    entityStatus: animal.entityStatus ?? "in shelter",
    animal_requirements: animal.animal_requirements ?? [],
    animal_personality_traits: animal.animal_personality_traits ?? [],
  };
}

// ─── API calls ────────────────────────────────────────────────────────────────

async function fetchListing(documentId: string): Promise<IAdoptionListing> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/${documentId}`,
  );
  if (!res.ok) throw new Error(`[adoption-listings] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function fetchRequirements(): Promise<IAnimalRequirement[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animal-requirements/`,
  );
  if (!res.ok) throw new Error(`[animal-requirements] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function fetchTraits(): Promise<IAnimalPersonalityTrait[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animal-personality-traits/`,
  );
  if (!res.ok) throw new Error(`[animal-personality-traits] ${res.status}`);
  const data = await res.json();
  return data.data;
}

async function uploadMedia(files: File[]): Promise<number[]> {
  if (files.length === 0) return [];
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data as { id: number }[]).map((f) => f.id);
}

async function createAnimal(draft: AnimalDraft): Promise<string> {
  const payload = {
    name: draft.name,
    sex: draft.sex,
    ...(draft.birthDate ? { birthDate: draft.birthDate } : {}),
    isDewormed: draft.isDewormed,
    isVaccinated: draft.isVaccinated,
    isSterilizedOrCastrated: draft.isSterilizedOrCastrated,
    isIdentified: draft.isIdentified,
    isAtypical: draft.isAtypical,
    dogAffinity: draft.dogAffinity,
    catAffinity: draft.catAffinity,
    childAffinity: draft.childAffinity,
    livingEnvironmentType: draft.livingEnvironmentType,
    entityStatus: draft.entityStatus,
    animal_requirements: draft.animal_requirements.map((r) => r.documentId),
    animal_personality_traits: draft.animal_personality_traits.map(
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
  if (!res.ok) throw new Error(`[animals/create] ${res.status} - ${await res.text()}`);
  const data = await res.json();
  return data.data.documentId as string;
}

async function updateAnimal(documentId: string, draft: AnimalDraft): Promise<void> {
  const payload = {
    documentId,
    name: draft.name,
    sex: draft.sex,
    ...(draft.birthDate ? { birthDate: draft.birthDate } : {}),
    isDewormed: draft.isDewormed,
    isVaccinated: draft.isVaccinated,
    isSterilizedOrCastrated: draft.isSterilizedOrCastrated,
    isIdentified: draft.isIdentified,
    isAtypical: draft.isAtypical,
    dogAffinity: draft.dogAffinity,
    catAffinity: draft.catAffinity,
    childAffinity: draft.childAffinity,
    livingEnvironmentType: draft.livingEnvironmentType,
    entityStatus: draft.entityStatus,
    animal_requirements: draft.animal_requirements.map((r) => r.documentId),
    animal_personality_traits: draft.animal_personality_traits.map(
      (t) => t.documentId,
    ),
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animals/update`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) throw new Error(`[animals/update] ${res.status} - ${await res.text()}`);
}

async function deleteAnimal(documentId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/animals/delete`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId }),
    },
  );
  if (!res.ok) throw new Error(`[animals/delete] ${res.status} - ${await res.text()}`);
}

async function updateListing(
  documentId: string,
  listing: ListingDraft,
  animalDocumentIds: string[],
  isDuo: boolean,
  newMediaIds: number[],
): Promise<void> {
  const allMediaIds = [...listing.existingMediaIds, ...newMediaIds];
  const payload = {
    documentId,
    title: listing.title,
    ...(listing.slogan ? { slogan: listing.slogan } : { slogan: null }),
    shortDescription: listing.shortDescription,
    longDescription: listing.longDescription,
    price: listing.price,
    isDuo,
    animals: animalDocumentIds,
    ...(allMediaIds.length > 0 ? { media: allMediaIds } : {}),
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/adoption-listings/update`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (!res.ok) throw new Error(`[adoption-listings/update] ${res.status} - ${await res.text()}`);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UpdateAdoptionListing({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  const [documentId, setDocumentId] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);
  const [isDuo, setIsDuo] = useState(false);
  const [animals, setAnimals] = useState<AnimalEntry[]>([]);
  const [listing, setListing] = useState<ListingDraft>({
    title: "",
    slogan: "",
    shortDescription: "",
    longDescription: "",
    price: 0,
    newMediaFiles: [],
    existingMediaIds: [],
  });
  const [requirements, setRequirements] = useState<IAnimalRequirement[]>([]);
  const [traits, setTraits] = useState<IAnimalPersonalityTrait[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [originalAnimalIds, setOriginalAnimalIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { slug } = await params;
        setDocumentId(slug);
        const [fetchedListing, reqs, trts] = await Promise.all([
          fetchListing(slug),
          fetchRequirements(),
          fetchTraits(),
        ]);

        setRequirements(reqs);
        setTraits(trts);
        setIsDuo(fetchedListing.isDuo);

        const entries = fetchedListing.animals.map(animalToEntry);
        setAnimals(entries);
        setOriginalAnimalIds(
          fetchedListing.animals.map((a) => a.documentId).filter(Boolean) as string[],
        );

        setListing({
          title: fetchedListing.title ?? "",
          slogan: fetchedListing.slogan ?? "",
          shortDescription: fetchedListing.shortDescription ?? "",
          longDescription: fetchedListing.longDescription ?? "",
          price: fetchedListing.price ?? 0,
          newMediaFiles: [],
          existingMediaIds:
            fetchedListing.media
              ?.map((m) => (m.id ? Number(m.id) : NaN))
              .filter((n) => !isNaN(n)) ?? [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params]);

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

  const updateAnimalEntry = (key: string, data: Partial<AnimalDraft>) => {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const animalDocumentIds: string[] = [];

      for (const { _key: _, documentId: animalDocId, ...draft } of animals) {
        if (animalDocId) {
          await updateAnimal(animalDocId, draft);
          animalDocumentIds.push(animalDocId);
        } else {
          const newId = await createAnimal(draft);
          animalDocumentIds.push(newId);
        }
      }

      const currentIds = new Set(
        animals.map((a) => a.documentId).filter(Boolean),
      );
      for (const id of originalAnimalIds) {
        if (!currentIds.has(id)) {
          await deleteAnimal(id);
        }
      }

      const newMediaIds = await uploadMedia(listing.newMediaFiles);

      await updateListing(documentId, listing, animalDocumentIds, isDuo, newMediaIds);

      router.push(`/adoption-listings/view/${documentId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-quaternary font-bold">Chargement…</p>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-[url('/assets/img/background-2.jpg')]">
        <div className="container relative">
          <Image
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            width={384}
            height={384}
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingPrimary>Modifier l'annonce</HeadingPrimary>
          </div>
        </div>
      </header>

      <main>
        <AdoptionListingForm
          mode="update"
          step={step}
          setStep={setStep}
          isDuo={isDuo}
          toggleDuo={toggleDuo}
          animals={animals}
          updateAnimal={updateAnimalEntry}
          requirements={requirements}
          traits={traits}
          listing={listing}
          onListingChange={handleListingChange}
          onFilesChange={handleFilesChange}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          error={error}
        />
      </main>
    </div>
  );
}
