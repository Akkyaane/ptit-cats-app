"use client";
import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import Image from "next/image";
import Heading from "@/components/ui/Heading";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <div className="container relative">
          <Image
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            width={384}
            height={384}
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <div className="flex flex-col items-center justify-center gap-4 py-16 md:py-24 lg:py-40">
            <Heading type="h1" headingVariant="secondary">Nous contacter</Heading>
            <p className="text-secondary text-center max-w-2xl text-base md:text-lg">
              Une question sur une adoption, le bénévolat ou la distribution de
              croquettes ? <br /> Nous vous répondons sous 48h.
            </p>
          </div>
        </div>
      </header>

      <main>
        <div className="container flex flex-col gap-12 md:gap-16 lg:gap-24">
          <section
            aria-label="Formulaire de contact"
            className="py-8 md:py-10 flex flex-col gap-12"
          >
            <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
              Envoyez-nous un message
            </Heading>

            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {status === "success" &&
                "Votre message a bien été envoyé. Nous vous répondrons sous 48h."}
              {status === "error" &&
                "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter par email."}
            </div>

            {status === "success" ? (
              <div className="p-6 rounded-xl border-2 border-green-300 bg-green-50 text-green-800 text-center max-w-2xl mx-auto w-full">
                <p className="font-bold text-lg mb-1">Message envoyé !</p>
                <p className="text-sm">
                  Merci pour votre message. Nous vous répondrons sous 48h.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5 w-full max-w-2xl mx-auto"
              >
                <fieldset className="flex flex-col gap-4 sm:flex-row border-0 p-0 m-0 min-w-0">
                  <legend className="sr-only">Identité</legend>
                  <FormInput
                    label="Nom"
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    wrapperClassName="flex-1"
                  />
                  <FormInput
                    label="Prénom"
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    wrapperClassName="flex-1"
                  />
                </fieldset>

                <FormInput
                  label="E-mail"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />

                <FormInput
                  label="Numéro de téléphone (optionnel)"
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />

                <FormInput
                  as="select"
                  label="Objet de la demande"
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez une option
                  </option>
                  <option value="distribution">
                    Distribution de croquettes
                  </option>
                  <option value="materiel">Don de matériel</option>
                  <option value="informations">
                    Demande d&apos;informations
                  </option>
                  <option value="autre">Autre</option>
                </FormInput>

                <FormInput
                  as="textarea"
                  label="Message"
                  id="message"
                  name="message"
                  required
                  rows={6}
                />

                {status === "error" && (
                  <div
                    role="alert"
                    className="px-4 py-3 rounded-xl border-2 border-red-300 bg-red-50 text-red-700 text-sm"
                  >
                    Une erreur est survenue lors de l&apos;envoi. Veuillez
                    réessayer ou nous contacter directement par email.
                  </div>
                )}

                <p className="text-sm text-quaternary">
                  <span
                    aria-hidden="true"
                    className="text-primary text-base font-bold"
                  >
                    *
                  </span>{" "}
                  Champs obligatoires
                </p>

                <p className="text-sm text-quaternary">
                  En cas de problème avec le formulaire, vous pouvez nous
                  contacter par e-mail à{" "}
                  <a
                    href="mailto:contact@sanscroquettesfixes.org"
                    className="text-primary underline"
                  >
                    sanscroquettesfixes@gmail.com
                  </a>{" "}
                  (informations générales),{" "}
                  <a
                    href="mailto:distribution@sanscroquettesfixes.fr"
                    className="text-primary underline"
                  >
                    distribution@sanscroquettesfixes.fr
                  </a>{" "}
                  (distribution de croquettes) ou{" "}
                  <a
                    href="mailto:dons@sanscroquettesfixes.fr"
                    className="text-primary underline"
                  >
                    dons@sanscroquettesfixes.fr
                  </a>{" "}
                  (dons matériels).
                </p>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="text-secondary font-bold rounded-xl border-2 hover:bg-secondary/40 backdrop-blur-sm transition-colors duration-200 text-center bg-primary border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary px-6 py-4 w-fit disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting"
                    ? "Envoi en cours…"
                    : "Envoyer le message"}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
