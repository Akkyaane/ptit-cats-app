import { strapiFetch } from "@/helpers/strapiHelper";

export async function deleteUploadedFiles(
  fileIds: (number | string)[],
): Promise<number[]> {
  const ids = [...new Set(fileIds.map(Number))].filter((id) => Number.isFinite(id));
  const failed: number[] = [];

  for (const id of ids) {
    try {
      const res = await strapiFetch(`/api/upload/files/${id}`, {
        method: "DELETE",
      });

      if (!res.ok && res.status !== 404) {
        console.error(
          `[upload] suppression du fichier ${id}: ${res.status} - ${await res.text()}`,
        );
        failed.push(id);
      }
    } catch (err) {
      console.error(`[upload] suppression du fichier ${id}: ${String(err)}`);
      failed.push(id);
    }
  }

  return failed;
}
