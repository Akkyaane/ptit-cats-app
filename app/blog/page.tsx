import { Editor } from "@/components/blocknote/DynamicEditor";

export default function DisplayBlog() {
  return (
    <div className="layout-header-spacing">
      <div
        style={{
          padding: "40px",
          minHeight: "100vh",
          backgroundColor: "#fafafa",
        }}
      >
        <h2>Mon Éditeur :</h2>
        <div
          style={{
            border: "2px dashed #ccc",
            minHeight: "300px",
            background: "#fff",
            padding: "20px",
          }}
        >
          <Editor />
        </div>
      </div>
    </div>
  );
}