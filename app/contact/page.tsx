"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeadingSecondary from "@/components/ui/HeadingSecondary";
import HeadingTertiary from "@/components/ui/HeadingTertiary";
import Button from "@/components/ui/Button";

export default function Contact() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <section className="container relative">
          <img
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <Navbar />
          <div className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingSecondary>Nous contacter</HeadingSecondary>
          </div>
        </section>
        <Button up={true} />
      </header>

      <main className="text-[var(--color-quaternary)]">
        <div className="container flex flex-col gap-12">
          <section className="p-8 md:p-10 flex flex-col gap-12">
            <HeadingTertiary
              headingVariant="primary"
              underlineVariant="primary"
            >
              Envoyez-nous un message
            </HeadingTertiary>

            <form className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex flex-col gap-1 flex-1">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-bold text-[var(--color-quaternary)]"
                  >
                    Nom <b className="text-[var(--color-primary)] text-base font-bold">*</b>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-bold text-[var(--color-quaternary)]"
                  >
                    Prénom <b className="text-[var(--color-primary)] text-base font-bold">*</b>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  E-mail <b className="text-[var(--color-primary)] text-base font-bold">*</b>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  Numéro de téléphone <b className="text-[var(--color-primary)] text-base font-bold">*</b>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="subject"
                  className="text-sm font-bold text-[var(--color-quaternary)]"
                >
                  Objet de la demande <b className="text-[var(--color-primary)] text-base font-bold">*</b>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] bg-white focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
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
                  Message <b className="text-[var(--color-primary)] text-base font-bold">*</b>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-tertiary)] text-[var(--color-quaternary)] resize-none focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-200"
                />
              </div>

              <p className="text-sm text-[var(--color-quaternary)]/70">
                <b className="text-[var(--color-primary)] text-base font-bold">*</b>{" "}
                Champs obligatoires
              </p>

              <button
                type="submit"
                className="text-[var(--color-secondary)] font-bold rounded-xl border border-2 hover:bg-[var(--color-secondary)]/40 backdrop-blur-sm transition-colors duration-200 text-center bg-[var(--color-primary)] border-[var(--color-primary)] hover:text-[var(--color-primary)] px-6 py-4 w-fit"
              >
                Envoyer le message
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
