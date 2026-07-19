import IAdoptionRequest, {
  AdoptionRequestStatus,
} from "@/interfaces/IAdoptionRequest";

export type StatusBadge = { label: string; className: string };

// Palette : primary (#dc0072), tertiary (#f1a5b1), quaternary (#240046),
// secondary (#fffffd). Les états en cours sont en tons clairs, les états
// terminaux (Refusée/Terminée) en aplats pleins pour ressortir.
const BADGE = {
  toProcess: "bg-tertiary/30 text-quaternary",
  transferred: "bg-quaternary/10 text-quaternary",
  inProgress: "bg-primary/10 text-primary",
  refused: "bg-quaternary text-secondary",
  done: "bg-primary text-secondary",
  fallback: "bg-quaternary/10 text-quaternary",
} as const;

// Vue bénévole (responsable / référent). Le responsable qui a transféré la
// demande la voit « Transférée » ; le référent assigné la voit « À traiter ».
export function volunteerStatusBadge(
  request: IAdoptionRequest,
  viewerDocumentId?: string,
): StatusBadge {
  const wasTransferredByViewer =
    !!request.transferredBy &&
    !!viewerDocumentId &&
    request.transferredBy === viewerDocumentId;

  if (wasTransferredByViewer && request.entityStatus === "to be processed") {
    return { label: "Transférée", className: BADGE.transferred };
  }

  switch (request.entityStatus) {
    case "to be processed":
      return { label: "À traiter", className: BADGE.toProcess };
    case "pending":
      return { label: "En cours", className: BADGE.inProgress };
    case "refused":
      return { label: "Refusée", className: BADGE.refused };
    case "done":
      return { label: "Terminée", className: BADGE.done };
    default:
      return { label: request.entityStatus, className: BADGE.fallback };
  }
}

// Vue adoptant. Une demande à traiter apparaît « En attente ».
export function adopterStatusBadge(
  status: AdoptionRequestStatus,
): StatusBadge {
  switch (status) {
    case "to be processed":
      return { label: "En attente", className: BADGE.toProcess };
    case "pending":
      return { label: "En cours", className: BADGE.inProgress };
    case "refused":
      return { label: "Refusée", className: BADGE.refused };
    case "done":
      return { label: "Terminée", className: BADGE.done };
    default:
      return { label: status, className: BADGE.fallback };
  }
}
