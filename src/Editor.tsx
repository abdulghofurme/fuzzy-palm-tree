import { FC, useCallback, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Editor: FC = () => {
  const [quill, setQuill] = useState<Quill>();
  const [defaultQuill, setDefaultQuill] = useState<Quill>();
  const editorRef = useCallback((node: HTMLDivElement) => {
    if (node && !quill) {
      const quillInstance = new Quill(node, {
        theme: "snow",
        modules: {
          toolbar: "#editor-toolbar",
        },
      });
      setQuill(quillInstance);
    }
  }, []);
  const defaultEditorRef = useCallback((node: HTMLDivElement) => {
    if (node && !defaultQuill) {
      const defaultQuillInstance = new Quill(node, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      setDefaultQuill(defaultQuillInstance);
    }
  }, []);
  return (
    <>
      <section id="editor-toolbar">
        <span className="ql-formats">
          <button className="ql-bold">bold</button>
        </span>
      </section>
      <section ref={editorRef} />

      <section ref={defaultEditorRef} />
    </>
  );
};

export default Editor;
