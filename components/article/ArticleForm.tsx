"use client";

import { useState } from "react";
import { PartialBlock } from "@blocknote/core";
import DynamicEditor from "@/components/blocknote/DynamicEditor";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { CATEGORY_OPTIONS, CATEGORY_LABELS } from "@/helpers/articleHelper";

export type ArticleDraft = {
  publicationDate: Date;
  category: string;
  content: PartialBlock[];
};

type ArticleFormProps = {
  initialDraft?: ArticleDraft;
  onSubmit: (draft: ArticleDraft) => Promise<void>;
  isSaving: boolean;
  error: string | null;
  submitLabel: string;
  heading: string;
  onCancel: () => void;
};

const INITIAL_CONTENT: PartialBlock[] = [
  { type: "heading", content: "Titre de l'article", props: { level: 1 } } as PartialBlock,
  { type: "paragraph", content: "Commencer à écrire…" } as PartialBlock,
];

export default function ArticleForm({
  initialDraft,
  onSubmit,
  isSaving,
  error,
  submitLabel,
  heading,
  onCancel,
}: ArticleFormProps) {
  const [category, setCategory] = useState(initialDraft?.category ?? "news");
  const [blocks, setBlocks] = useState<PartialBlock[]>(
    initialDraft?.content ?? INITIAL_CONTENT,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      publicationDate: initialDraft?.publicationDate ?? new Date(),
      category,
      content: blocks,
    });
  }

  return (
    <div className="container flex flex-col gap-6">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
        <Heading type="h2" headingVariant="quaternary" underlineVariant="tertiary">
          {heading}
        </Heading>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

          <div className="max-w-xs">
            <Select
              name="category"
              value={category}
              options={[...CATEGORY_OPTIONS]}
              translatedOptions={CATEGORY_LABELS}
              required={true}
              labelName="Catégorie"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>


          <div className="h-px bg-tertiary/50" />


          <DynamicEditor
            initialContent={initialDraft?.content ?? INITIAL_CONTENT}
            onChange={setBlocks}
            editable={!isSaving}
          />


          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onCancel}
              disabled={isSaving}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSaving}
            >
              {isSaving ? "Enregistrement…" : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
