"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import IAdoptionRequest from "@/interfaces/IAdoptionRequest";
import {
  volunteerStatusBadge,
  adopterStatusBadge,
} from "@/components/account/adoptionRequestStatus";
import { setAdoptionRequestStatus } from "@/app/adoption-requests/action";

const CONGRATS =
  "Félicitations, votre demande a été approuvée. Un bénévole prendra contact avec vous d'ici quelques jours.";

export default function RequestReview({
  request,
  viewerDocumentId,
  canAct,
  readOnly = false,
}: {
  request: IAdoptionRequest;
  viewerDocumentId: string;
  canAct: boolean;
  readOnly?: boolean;
}) {
  const router = useRouter();
  const [remarks, setRemarks] = useState(request.remarks ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Vue adoptant : lecture seule (statut côté adoptant + réponse du responsable).
  if (readOnly) {
    const adopterBadge = adopterStatusBadge(request.entityStatus);
    return (
      <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Suivi de votre demande</h2>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${adopterBadge.className}`}
          >
            {adopterBadge.label}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-wide text-quaternary/40">
            Réponse du responsable
          </p>
          {request.entityStatus === "pending" ? (
            <p className="rounded-xl bg-primary/10 text-primary font-semibold px-4 py-3">
              {CONGRATS}
            </p>
          ) : request.remarks ? (
            <p className="text-quaternary/70 whitespace-pre-line">
              {request.remarks}
            </p>
          ) : (
            <p className="text-quaternary/40 italic">
              Aucune réponse pour le moment.
            </p>
          )}
        </div>
      </div>
    );
  }

  const badge = volunteerStatusBadge(request, viewerDocumentId);
  const status = request.entityStatus;
  const isToProcess = status === "to be processed";
  const isInProgress = status === "pending";

  function act(next: "refused" | "pending" | "done") {
    setError(null);
    startTransition(async () => {
      const result = await setAdoptionRequestStatus(
        request.documentId,
        next,
        remarks.trim() || undefined,
      );
      if (result?.error) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">Traitement de la demande</h2>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      {error && (
        <p className="px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary text-primary font-bold text-sm">
          {error}
        </p>
      )}

      <Textarea
        name="remarks"
        labelName="Remarques"
        rows={5}
        required={false}
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      {!canAct ? (
        <p className="text-sm text-quaternary/60 italic">
          Cette demande n&apos;est plus sous votre responsabilité (transférée ou
          finalisée). Consultation en lecture seule.
        </p>
      ) : isToProcess ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => act("pending")}
            disabled={isPending}
          >
            {isPending ? "…" : "✓ Valider la demande"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => act("refused")}
            disabled={isPending}
          >
            {isPending ? "…" : "✗ Refuser la demande"}
          </Button>
        </div>
      ) : isInProgress ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => act("done")}
            disabled={isPending}
          >
            {isPending ? "…" : "Terminer l'adoption"}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-quaternary/60 italic">
          Cette demande est finalisée. Aucune action supplémentaire n&apos;est
          possible.
        </p>
      )}
    </div>
  );
}
