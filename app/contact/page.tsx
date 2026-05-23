"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingPrimary from "@/components/ui/HeadingPrimary";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Contact() {
  return (
    <div>
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
          <Navbar />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingPrimary>Nous contacter</HeadingPrimary>
          </div>
        </div>
      </header>

      <main className="text-[var(--color-quaternary)]">
        <div className="container flex flex-col gap-12">
          <section className="p-8 md:p-10 flex flex-col gap-12">
            <HeadingSecondary
              headingVariant="primary"
              underlineVariant="primary"
            >
              Envoyez-nous un message
            </HeadingSecondary>

            <form className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-col gap-1 flex-1">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-bold text-[var(--color-quaternary)]"
                  >
                    Nom <span aria-hidden="true" className="text-[var(--color-primary)] text-base font-bold">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-bold text-[var(--color-quaternary)]"
                  >
                    Prénom <span aria-hidden="true" className="text-[var(--color-primary)] text-base font-bold">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  E-mail <span aria-hidden="true" className="text-[var(--color-primary)] text-base font-bold">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  Numéro de téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="subject"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  Objet de la demande <span aria-hidden="true" className="text-[var(--color-primary)] text-base font-bold">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] bg-white focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200"
                >
                  <option value="" disabled>
                    Sélectionnez une option
                  </option>
                  <option value="distribution">
                    Je souhaite bénéficier de la distribution de croquettes
                  </option>
                  <option value="materiel">
                    Je souhaite donner du matériel
                  </option>
                  <option value="informations">
                    Je souhaite obtenir plus d&apos;informations
                  </option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  Message <span aria-hidden="true" className="text-[var(--color-primary)] text-base font-bold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] resize-none focus:outline-none focus:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 transition-colors duration-200"
                />
              </div>

              <p className="text-sm text-[var(--color-quaternary)]/70">
                <span aria-hidden="true" className="text-[var(--color-primary)] text-base font-bold">*</span>{" "}
                Champs obligatoires
              </p>

              <button
                type="submit"
                className="text-[var(--color-secondary)] font-bold rounded-xl border-2 hover:bg-[var(--color-secondary)]/40 backdrop-blur-sm transition-colors duration-200 text-center bg-[var(--color-primary)] border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] px-6 py-4 w-fit"
              >
                Envoyer le message
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
      <Button up={true} />
    </div>
  );
}
