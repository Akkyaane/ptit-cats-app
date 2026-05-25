"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAdoptant } from "@/app/adoptant/update/action";
import { IAdoptant } from "@/interfaces/IAdoptant";

export default function UpdateAdoptantForm({
  adoptant,
}: {
  adoptant: IAdoptant;
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await updateAdoptant(adoptant.documentId, formData);

    if (result.error) {
      setError(result.error);
    } else {
      router.push(`/adoptant/view/${adoptant.documentId}?updated=true`);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-bold ">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={adoptant.name}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-bold ">
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue={adoptant.firstName}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-bold ">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={adoptant.email}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="housingType" className="text-sm font-bold ">
          Type de logement
        </label>
        <select
          id="housingType"
          name="housingType"
          defaultValue={adoptant.housingType ?? ""}
          className="w-full px-4 py-3 rounded-xl border-2 border-tertiary focus:outline-none focus:border-primary transition-colors duration-200 bg-white"
        >
          <option value="">-- Non renseigné --</option>
          <option value="maison">Maison</option>
          <option value="appartement">Appartement</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <em className="text-sm font-bold ">Avez-vous un jardin ?</em>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="radio"
              name="hasGarden"
              value="true"
              defaultChecked={adoptant.hasGarden === true}
              className="accent-primary"
            />{" "}
            Oui
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="radio"
              name="hasGarden"
              value="false"
              defaultChecked={adoptant.hasGarden !== true}
              className="accent-primary"
            />{" "}
            Non
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm font-bold text-primary bg-primary/10 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 font-bold rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/10 hover:text-primary transition-colors duration-200"
      >
        Mettre à jour
      </button>
    </form>
  );
}
