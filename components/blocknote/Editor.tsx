"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useEffect } from "react";

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

type EditorProps = {
  initialContent?: PartialBlock[];
  onChange?: (blocks: PartialBlock[]) => void;
  editable?: boolean;
};

export default function Editor({ initialContent, onChange, editable = true }: EditorProps) {
  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile,
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined,
  });

  useEffect(() => {
    if (!onChange) return;

    const unsubscribe = editor.onChange(() => {
      onChange(editor.document as PartialBlock[]);
    });

    return () => unsubscribe();
  }, [editor, onChange]);

  return (
    <div className="bn-article-editor">
      <BlockNoteView editor={editor} editable={editable} theme="light" />
    </div>
  );
}
