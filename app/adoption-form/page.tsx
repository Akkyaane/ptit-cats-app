"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type StepId = "profile" | "environment" | "connection";

const STEPS: { id: StepId; label: string; icon: string; title: string; subtitle: string }[] = [
  {
    id: "profile",
    label: "Votre profil",
    icon: "👤",
    title: "Parlez-nous de vous",
    subtitle: "Ces informations permettent à notre équipe de mieux vous connaître.",
  },
  {
    id: "environment",
    label: "Votre foyer",
    icon: "🏠",
    title: "Votre environnement",
    subtitle: "Aidez-nous à comprendre le cadre de vie que vous offrez.",
  },
  {
    id: "connection",
    label: "Votre lien",
    icon: "🐾",
    title: "Votre lien avec l'animal",
    subtitle: "Quel type de compagnon recherchez-vous ?",
  },
];

const PERSONALITY_TRAITS = [
  "Joueur", "Câlin", "Indépendant", "Calme", "Bavard", "Doux", "Énergique", "Curieux",
];

export default function AdoptionFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [residenceType, setResidenceType] = useState<string>("");

  const step = STEPS[currentStep];

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div>
        <header className="bg-[var(--color-quaternary)]">
          <div className="max-w-[1200px] mx-auto">
            <Navbar />
          </div>
        </header>
        <main className="min-h-[70vh] flex items-center justify-center px-4 py-24">
          <div className="max-w-xl text-center flex flex-col items-center gap-6">
            <span className="text-6xl">🐱</span>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-quaternary)]">
              Demande envoyée !
            </h1>
            <div className="w-16 h-1 bg-[var(--color-tertiary)] rounded-full mx-auto"></div>
            <p className="text-lg text-[var(--color-quaternary)]/70 leading-relaxed">
              Merci pour votre demande d'adoption. Notre responsable d'adoption va la recevoir et vous
              contactera sous <strong>3 à 5 jours ouvrés</strong>. Vous recevrez un e-mail de suivi avec
              l'état de votre dossier.
            </p>
            <div className="bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] px-6 py-4 rounded-r-xl text-left w-full">
              <p className="text-sm font-semibold text-[var(--color-quaternary)]">
                📬 Votre demande passera par les étapes suivantes : <br />
                <span className="font-normal opacity-80">
                  En attente → En cours d'examen → Acceptée ou Refusée
                </span>
              </p>
            </div>
            <a
              href="/"
              className="px-6 py-4 text-sm bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold rounded-xl border border-2 border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              Retour à l'accueil
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center bg-no-repeat">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-20 px-4 md:py-28 md:max-w-xl lg:py-36 lg:max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)]/70 bg-[var(--color-primary)]/20 px-4 py-1.5 rounded-full border border-[var(--color-primary)]/30">
              Adoption
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Le chemin vers <br />
              <span className="text-[var(--color-tertiary)]">votre compagnon</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-secondary)]/80 leading-relaxed max-w-xl">
              Remplissez ce formulaire pour déposer votre demande d'adoption. Notre équipe l'examinera
              avec soin.
            </p>
          </section>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-4 py-12 flex flex-col gap-10">

        {/* Process info banner */}
        <div className="bg-[var(--color-quaternary)] text-[var(--color-secondary)] rounded-xl px-6 py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <p className="font-bold text-lg mb-1">Comment ça marche ?</p>
            <p className="text-sm text-[var(--color-secondary)]/70 leading-relaxed">
              Votre demande est reçue par notre responsable d'adoption (ou un référent disponible), puis
              traitée automatiquement. Vous suivez son état en temps réel.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap shrink-0">
            {["En attente", "En cours", "Acceptée", "Refusée"].map((s, i) => (
              <span
                key={s}
                className={`px-3 py-1 text-xs font-bold rounded-full border ${
                  i === 0
                    ? "bg-[var(--color-secondary)]/10 border-[var(--color-secondary)]/30 text-[var(--color-secondary)]"
                    : i === 1
                    ? "bg-[var(--color-tertiary)]/20 border-[var(--color-tertiary)]/40 text-[var(--color-tertiary)]"
                    : i === 2
                    ? "bg-green-500/20 border-green-400/40 text-green-300"
                    : "bg-red-500/20 border-red-400/40 text-red-300"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-2 z-10">
              <button
                onClick={() => i < currentStep && setCurrentStep(i)}
                className={`size-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  i < currentStep
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-secondary)] cursor-pointer"
                    : i === currentStep
                    ? "bg-white border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "bg-white border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {i < currentStep ? "✓" : i + 1}
              </button>
              <span
                className={`text-xs font-bold hidden sm:block ${
                  i <= currentStep ? "text-[var(--color-quaternary)]" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="bg-[var(--color-quaternary)] px-8 py-8 flex gap-5 items-center">
            <div className="size-14 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center text-2xl">
              {step.icon}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)]/50 mb-1">
                Étape {currentStep + 1} sur {STEPS.length}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">{step.title}</h2>
              <p className="text-sm text-[var(--color-secondary)]/60 mt-0.5">{step.subtitle}</p>
            </div>
          </div>

          {/* Card body */}
          <div className="bg-white px-8 py-8">
            {currentStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Prénom et nom" placeholder="ex. Marie Dupont" />
                <FormField label="Adresse e-mail" placeholder="marie@exemple.fr" type="email" />
                <FormField label="Téléphone" placeholder="+33 6 00 00 00 00" type="tel" className="sm:col-span-2" />
                <FormField label="Adresse postale" placeholder="Où vivra l'animal ?" className="sm:col-span-2" />
                <FormField label="Profession" placeholder="Votre activité principale" />
                <FormField label="Disponibilité quotidienne" placeholder="ex. Télétravail, horaires fixes…" />
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-quaternary)]/60 mb-3">
                    Type de logement
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Maison", "Appartement", "Studio", "Autre"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setResidenceType(type)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                          residenceType === type
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-secondary)]"
                            : "bg-white border-gray-200 text-[var(--color-quaternary)] hover:border-[var(--color-primary)]/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-quaternary)]/60 mb-2">
                      Propriétaire ou locataire ?
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-[var(--color-quaternary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors">
                      <option value="">Sélectionner</option>
                      <option>Propriétaire</option>
                      <option>Locataire avec autorisation</option>
                      <option>Locataire sans confirmation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-quaternary)]/60 mb-2">
                      Accès extérieur ?
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-[var(--color-quaternary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors">
                      <option value="">Sélectionner</option>
                      <option>Extérieur sécurisé</option>
                      <option>Extérieur libre</option>
                      <option>Intérieur uniquement</option>
                    </select>
                  </div>
                </div>
                <FormField
                  label="Autres résidents (personnes et animaux)"
                  placeholder="Décrivez la composition de votre foyer…"
                  as="textarea"
                />
                <div className="bg-[var(--color-tertiary)]/10 border border-[var(--color-tertiary)]/30 rounded-xl px-5 py-4">
                  <p className="text-sm font-bold text-[var(--color-quaternary)] mb-1">💡 Le saviez-vous ?</p>
                  <p className="text-xs text-[var(--color-quaternary)]/70 leading-relaxed">
                    Un chat a besoin d'au moins un espace en hauteur par pièce principale pour se sentir en
                    sécurité et explorer son environnement.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-quaternary)]/60 mb-3">
                    Traits de personnalité souhaités
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PERSONALITY_TRAITS.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                          selectedTraits.includes(trait)
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-secondary)]"
                            : "bg-white border-gray-200 text-[var(--color-quaternary)] hover:border-[var(--color-primary)]/50"
                        }`}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>
                <FormField
                  label="Expérience avec les animaux"
                  placeholder="Parlez-nous des compagnons qui ont partagé votre vie…"
                  as="textarea"
                />
                <FormField
                  label="Pourquoi adopter chez Sans Croquettes Fixes ?"
                  placeholder="Qu'est-ce qui vous a amené vers nous ?"
                  as="textarea"
                />

                <div className="flex items-start gap-3 pt-2 border-t border-gray-100">
                  <input
                    type="checkbox"
                    id="confirm"
                    className="mt-1 size-4 accent-[var(--color-primary)] cursor-pointer"
                  />
                  <label htmlFor="confirm" className="text-sm text-[var(--color-quaternary)]/70 cursor-pointer">
                    Je confirme que toutes les informations fournies sont exactes et que je suis majeur(e).
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Card footer */}
          <div className="bg-gray-50 border-t border-gray-100 px-8 py-5 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
              disabled={currentStep === 0}
              className={`px-5 py-3 text-sm font-bold rounded-xl border border-2 transition-colors duration-200 ${
                currentStep === 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-[var(--color-quaternary)] text-[var(--color-quaternary)] hover:bg-[var(--color-quaternary)] hover:text-[var(--color-secondary)]"
              }`}
            >
              ← Précédent
            </button>

            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={() => setCurrentStep((p) => p + 1)}
                className="px-6 py-3 text-sm bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold rounded-xl border border-2 border-[var(--color-primary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200"
              >
                Étape suivante →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 text-sm bg-[var(--color-quaternary)] text-[var(--color-secondary)] font-bold rounded-xl border border-2 border-[var(--color-quaternary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-quaternary)] transition-colors duration-200"
              >
                Envoyer ma demande 🐾
              </button>
            )}
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-[var(--color-quaternary)]/50">
          Le délai de réponse est généralement de 3 à 5 jours ouvrés.
        </p>
      </main>
      <Footer />
    </div>
  );
}

// ─── Reusable field ──────────────────────────────────────────────────────────

function FormField({
  label,
  placeholder,
  type = "text",
  as,
  className = "",
}: {
  label: string;
  placeholder?: string;
  type?: string;
  as?: "textarea";
  className?: string;
}) {
  const base =
    "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-[var(--color-quaternary)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400";
  return (
    <div className={className}>
      <label className="block text-xs font-bold uppercase tracking-widest text-[var(--color-quaternary)]/60 mb-2">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea rows={4} placeholder={placeholder} className={`${base} resize-none`} />
      ) : (
        <input type={type} placeholder={placeholder} className={base} />
      )}
    </div>
  );
}