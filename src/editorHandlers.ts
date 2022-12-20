import Quill from "quill";

export function ctaHandler(this: any, isActive: boolean) {
  // console.log("=== CTA Handler", { this: this, isActive });
  const editor: Quill = this.quill;

  // editor.updateContents([
  //   {
  //     insert: "CTA",
  //     attributes: { link: "https://bareksa.com", target: "_top" },
  //   },
  //   // {
  //   //   insert: `<a href='test' target='_top'>OK</a>`,
  //   // },
  // ]);
  // editor.insertText(editor.getLength(), 'Quill')
  // editor.insertText(editor.getLength(), `<a href='test' target='_top'>OK</a>`)
  // editor.setContents([
  //   { insert: "Hello " },
  //   { insert: "World!", attributes: { bold: true } },
  //   { insert: "\n" },
  //   { insert: "\n" },
  // ]);
  // editor.insertText(0, `value`, {
  //   cta: { href: "test_href", target: "test_target" },
  // });
  const selection = editor.getSelection();
  console.log({ selection }, editor.scroll.length, editor.getLength());
  editor.updateContents([
    { retain: selection?.index },
    {
      insert: `value`,
      attributes: {
        cta: { href: "test_href", target: "test_target" },
      },
    },
  ]);
}
