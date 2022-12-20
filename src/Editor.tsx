import { FC, useCallback, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { ctaHandler } from "./editorHandlers";
import { CTAFormat, HeaderFormat } from "./editorFormats";

Quill.register(CTAFormat);
Quill.register(HeaderFormat);

const Editor: FC = () => {
  const [quill, setQuill] = useState<Quill>();
  const [defaultQuill, setDefaultQuill] = useState<Quill>();
  const editorRef = useCallback((node: HTMLDivElement) => {
    if (node && !quill) {
      const quillInstance = new Quill(node, {
        modules: {
          toolbar: {
            container: "#editor-toolbar",
            handlers: {
              cta: ctaHandler,
            },
          },
        },
      });
      const toolbar = quillInstance.getModule("toolbar");

      setQuill(quillInstance);
    }
  }, []);

  const defaultEditorRef = useCallback((node: HTMLDivElement) => {
    if (node && !defaultQuill) {
      const defaultQuillInstance = new Quill(node, {
        theme: "snow",
        modules: {
          toolbar: [
            ["undo", "redo"],
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

  const [textType, setTextType] = useState("p");

  quill?.on("text-change", function (delta, oldDelta, source) {
    if (source == "api") {
    } else if (source == "user") {
    }
    const html = quill?.root.innerHTML;

    console.log("=== DELTA", delta);
    console.log("=== HTML", html);
  });
  quill?.on("selection-change", (range, oldRange, source) => {
    // In editor
    if (range) {
      console.log(quill.getFormat().header || "p");
      setTextType(quill.getFormat().header || "p");
    } else {
    }
  });

  return (
    <>
      {/* ql-editor */}
      <section id="editor-toolbar">
        <select
          value={textType}
          onChange={(e) => {
            const { value } = e.target;
            quill?.format("header", value);
            setTextType(value)
          }}
        >
          <option value="h1">Header 1</option>
          <option value="h2">Header 2</option>
          <option value="h3">Header 3</option>
          <option value="h4">Header 4</option>
          <option value="h5">Header 5</option>
          <option value="h6">Header 6</option>
          <option value="p">Normal</option>
          <option value="custom-caption">Caption</option>
        </select>

        <span className="ql-formats">
          <button className="ql-bold">bold</button>
          <button className="ql-link">link</button>
          <button className="ql-cta">CTA</button>
        </span>
      </section>
      <section ref={editorRef} />

      <section ref={defaultEditorRef} />
    </>
  );
};

export default Editor;
