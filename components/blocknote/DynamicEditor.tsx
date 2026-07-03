"use client";

import dynamic from "next/dynamic";
import { PartialBlock } from "@blocknote/core";

function EditorSkeleton() {
  return (
    <div
      style={{
        minHeight: 200,
        borderRadius: 8,
        background: "var(--color-background-secondary, #f5f5f5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-tertiary, #aaa)",
        fontSize: 14,
      }}
    >
      Chargement de l'éditeur…
    </div>
  );
}

export const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

type Props = {
  initialContent?: PartialBlock[];
  onChange?: (blocks: PartialBlock[]) => void;
  editable?: boolean;
};

export default function DynamicEditor(props: Props) {
  return <Editor {...props} />;
}
