"use client";

import { useState } from "react";
import APCatProfileFields from "@/components/adoptionPost/APCatFormFields";
import { ICat } from "@/interfaces/ICat";
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
  const [price, setPrice] = useState(0);
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
    setCats([...cats, { _key: crypto.randomUUID() }]);

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
    formData.append("price", price.toString());

    const catsPayload = cats.map(({ _key, ...rest }) => rest);
    formData.append("cats", JSON.stringify(catsPayload));

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await fetch("/api/adoption-posts", {
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
      setPrice(0);
      setCats([]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setStatus({ loading: false, error: errorMessage, success: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-quaternary">
          Titre
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="slogan" className="text-sm font-medium text-quaternary">
          Slogan
        </label>
        <input
          id="slogan"
          type="text"
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="shortDescription" className="text-sm font-medium text-quaternary">
          Description courte
        </label>
        <textarea
          id="shortDescription"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="longDescription" className="text-sm font-medium text-quaternary">
          Description longue
        </label>
        <textarea
          id="longDescription"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="photos" className="text-sm font-medium text-quaternary">
          Photos
        </label>
        <input
          id="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          required
          className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:border file:border-gray-300 file:bg-white file:text-sm file:font-medium hover:file:bg-gray-50"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isDuo"
          type="checkbox"
          checked={isDuo}
          onChange={(e) => setIsDuo(e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="isDuo" className="text-sm font-medium text-quaternary">
          Duo
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="text-sm font-medium text-quaternary">
          Prix (€)
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-primary"
        />
      </div>

      {cats.map(({ _key, ...catData }) => (
        <APCatProfileFields
          key={_key}
          value={catData}
          onChange={(data) => updateCat(_key, data)}
          onRemove={() => removeCat(_key)}
          animalRequirements={animalRequirements}
        />
      ))}

      <button
        type="button"
        onClick={addCat}
        className="w-full py-2 px-4 border border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded font-medium"
      >
        Ajouter un animal
      </button>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full py-2 px-4 bg-primary text-white font-medium rounded hover:bg-quaternary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status.loading ? "Envoi en cours..." : "Publier l'article"}
      </button>

      {status.success && (
        <p className="text-sm text-green-600">✓ Formulaire et photos envoyés avec succès !</p>
      )}
      {status.error && (
        <p className="text-sm text-red-600">Erreur : {status.error}</p>
      )}
    </form>
  );
}

