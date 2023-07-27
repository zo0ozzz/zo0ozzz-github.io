import { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";

const Font = Quill.import("formats/font");

Font.whitelist = [
  false,
  "굴림",
  "ibmPlexMono",
  "sans-serif",
  "serif",
  "monospace",
];

Quill.register(Font, true);

// const Size = Quill.import("formats/size");
// Size.whitelist = ["10", false, "11"];
// Quill.register(Size, true);

// * modules
export const editorModulesConfig = {
  // syntax: true,
  syntax: {
    // highlight: (text) => hljs.highlightAuto(text).value,
    // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
    highlight: true,
  },
  toolbar: {
    container: [
      // { font: [] },
      { font: Font.whitelist },
      { size: [] },
      // { size: Size.whitelist },
      "custom",
      "bold",
      "italic",
      "underline",
      "strike",

      { color: [] },
      { background: [] },

      { align: null },
      { align: "center" },
      { align: "right" },
      { align: "justify" },

      "blockquote",
      "code",
      "code-block",
      "link",
      "image",

      { list: "ordered" },
      { list: "bullet" },

      { indent: "-1" },
      { indent: "+1" },

      "clean",
    ],
    handlers: {
      custom: function () {
        console.log(1);
      },
    },
  },
};

export const viewerModulesConfig = {
  // 툴바 X
  toolbar: false,
  // hljs 적용.
  // syntax: true,
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
    // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
  },
};

// * formats
export const formats = [
  // 모든 포멧
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
  "code-block",
];
