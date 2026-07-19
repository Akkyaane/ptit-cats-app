import { strapiFetch } from "@/helpers/strapiHelper";

type VolunteerLoad = {
  documentId: string;
  activeCount: number;
  present: boolean;
};

export async function getVolunteersWithLoad(
  role: "manager" | "referent",
): Promise<VolunteerLoad[]> {
  const params = new URLSearchParams();
  params.set("filters[role][$eq]", role);
  params.set("populate[adoption_requests][fields][0]", "entityStatus");
  params.set("populate[absences][fields][0]", "startDate");
  params.set("populate[absences][fields][1]", "endDate");
  params.set("pagination[pageSize]", "100");

  const res = await strapiFetch(`/api/volunteers?${params}`, { cache: "no-store" });
  if (!res.ok) return [];

  const json = await res.json();
  const now = Date.now();

  return (json.data ?? []).map(
    (v: {
      documentId: string;
      adoption_requests?: { entityStatus: string }[];
      absences?: { startDate?: string; endDate?: string }[];
    }) => {
      const activeCount = (v.adoption_requests ?? []).filter(
        (r) =>
          r.entityStatus === "to be processed" || r.entityStatus === "pending",
      ).length;
      const present = !(v.absences ?? []).some((a) => {
        const start = a.startDate ? new Date(a.startDate).getTime() : -Infinity;
        const end = a.endDate ? new Date(a.endDate).getTime() : Infinity;
        return start <= now && now <= end;
      });
      return { documentId: v.documentId, activeCount, present };
    },
  );
}

export function pickAssignee(pool: VolunteerLoad[]): string | null {
  if (pool.length === 0) return null;
  const byLoad = (a: VolunteerLoad, b: VolunteerLoad) =>
    a.activeCount - b.activeCount;
  const present = pool.filter((v) => v.present).sort(byLoad);
  if (present.length > 0) return present[0].documentId;
  return [...pool].sort(byLoad)[0].documentId;
}
