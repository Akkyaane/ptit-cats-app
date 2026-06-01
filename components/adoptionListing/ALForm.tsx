"use client";

import { useState } from "react";
import APCatProfileFields from "@/components/adoptionListing/AnimalFields";
import { ICat } from "@/interfaces/IAnimal";
import { IAnimalRequirement } from "@/interfaces/IAnimalRequirement";

type CatFormEntry = Partial<ICat> & { _key: string };

interface Props {
  animalRequirements?: IAnimalRequirement[];
}

export default function APForm({ animalRequirements = [] }: Props) {
  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDuo, setIsDuo] = useState(false);
  const [price, setPrice] = useState<number | "">("");
  const [cats, setCats] = useState<CatFormEntry[]>([]);
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  const addCat = () =>
    setCats([
      ...cats,
      {
        _key: crypto.randomUUID(),
        sex: "Male",
        livingEnvironmentType: "Apartment",
        dogAffinity: "Unknown",
        catAffinity: "Unknown",
        childAffinity: "Unknown",
        isDewormed: false,
        isVaccinated: false,
        isSterilizedOrCastrated: false,
        isIdentified: false,
      },
    ]);

  const removeCat = (key: string) =>
    setCats(cats.filter((c) => c._key !== key));

  const updateCat = (key: string, data: Partial<ICat>) =>
    setCats(cats.map((c) => (c._key === key ? { ...c, ...data } : c)));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slogan", slogan);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("isDuo", isDuo.toString());
    formData.append("price", price === "" ? "0" : price.toString());

    const catsPayload = cats.map(({ _key, ...rest }) => rest);
    formData.append("cats", JSON.stringify(catsPayload));

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await fetch("/api/adoption-listings", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue");
      }

      setStatus({ loading: false, error: null, success: true });
      setTitle("");
      setSlogan("");
      setShortDescription("");
      setLongDescription("");
      setPhotos([]);
      setIsDuo(false);
      setPrice("");
      setCats([]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setStatus({ loading: false, error: errorMessage, success: false });
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors duration-200";
  const lClass = "text-sm font-bold ";
  const req = (
    <span aria-hidden="true" className="text-primary font-bold">
      {" "}
      *
    </span>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={lClass}>
          Titre{req}
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="slogan" className={lClass}>
          Slogan
        </label>
        <input
          id="slogan"
          type="text"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="shortDescription" className={lClass}>
          Description courte{req}
        </label>
        <textarea
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="longDescription" className={lClass}>
          Description longue{req}
        </label>
        <textarea
          id="longDescription"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
          rows={6}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="photos" className={lClass}>
          Photos{req}
        </label>
        <input
          id="photos"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleFileChange}
          required
          className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-tertiary file:bg-white file:text-sm file:font-bold file:text-quaternary hover:file:bg-tertiary/20 transition-colors duration-200"
        />
        <p className="text-xs text-quaternary/60 mt-1">
          Formats acceptés : JPG, JPEG, PNG, WEBP — Maintenez{" "}
          <kbd className="px-1 py-0.5 rounded border border-gray-300 bg-gray-100 text-xs font-mono">
            Ctrl
          </kbd>{" "}
          (ou{" "}
          <kbd className="px-1 py-0.5 rounded border border-gray-300 bg-gray-100 text-xs font-mono">
            ⌘ Cmd
          </kbd>{" "}
          sur Mac) pour sélectionner plusieurs fichiers.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-tertiary">
        <input
          id="isDuo"
          type="checkbox"
          checked={isDuo}
          onChange={(e) => setIsDuo(e.target.checked)}
          className="w-5 h-5 accent-primary"
        />
        <label htmlFor="isDuo" className={lClass}>
          Duo (plusieurs animaux ensemble)
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price" className={lClass}>
          Prix (€){req}
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
          min={0}
          className={inputClass}
        />
      </div>

      {cats.map(({ _key, ...catData }, i) => (
        <APCatProfileFields
          key={_key}
          index={i + 1}
          value={catData}
          onChange={(data) => updateCat(_key, data)}
          onRemove={() => removeCat(_key)}
          animalRequirements={animalRequirements}
        />
      ))}

      <button
        type="button"
        onClick={addCat}
        className="w-full py-3 px-4 rounded-xl border-2 border-quaternary bg-white hover:bg-quaternary hover:text-white font-bold transition-colors duration-200"
      >
        + Ajouter un animal
      </button>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-quaternary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status.loading ? "Envoi en cours..." : "Publier l'annonce"}
      </button>

      {status.success && (
        <p className="text-sm font-bold text-green-600 text-center">
          ✓ Annonce créée avec succès !
        </p>
      )}
      {status.error && (
        <p className="text-sm font-bold text-red-600 text-center">
          Erreur : {status.error}
        </p>
      )}
    </form>
  );
}
