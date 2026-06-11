"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/",
  );
}

export default function Editor() {
  const editor = useCreateBlockNote({
    uploadFile
  });

  return <BlockNoteView editor={editor} />;
}