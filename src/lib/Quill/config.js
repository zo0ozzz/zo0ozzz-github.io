import { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";

const Font = Quill.import("formats/font");
const BlockEmbed = Quill.import("blots/embed");

Font.whitelist = [
  false,
  "굴림",
  "ibmPlexMono",
  "sans-serif",
  "serif",
  "monospace",
];

class ImageResizer1 extends BlockEmbed {
  static create(value) {
    let node = super.create();

    // node.setAttribute("alt", value.alt);
    node.setAttribute("src", value.src);

    return node;
  }

  static value(node) {
    return {
      // alt: node.getAttribute("alt"),
      src: node.getAttribute("src"),
    };
  }
}

ImageResizer1.blotName = "imageResizer1";
ImageResizer1.tagName = "img";
ImageResizer1.className = "imageResizer1";

Quill.register(Font, true);
Quill.register(ImageResizer1, true);

// const Size = Quill.import("formats/size");
// Size.whitelist = ["10", false, "11"];
// Quill.register(Size, true);

// * modules
export const editorModulesConfig = {
  // syntax: true,
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
    // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
    // highlight: true,
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
      "imageResizer1",
    ],
    handlers: {
      imageResizer1: function () {
        // const alt = "Quill Cloud";
        // const url = "https://quilljs.com/0.20/assets/images/cloud.png";
        const range = this.quill.getSelection(true);
        const content = this.quill.getContents(range).ops[0]?.insert;

        if (content.image || content.imageResizer1) {
          const src = content.image || content.imageResizer1?.src;

          // const format = this.quill.getFormat(range);

          // console.log(format);
          // quill 에디터에서 셀렉된 상태의 인덱스와 레인지를 가져옴.
          // true는 왜 쓰는지 모르겠음.

          // 실제로는 alt과 url을 받아와서 할당해주면 됨.
          // url은 이미지를 올리고 서버에서 url로 받아오면 될 듯.
          this.quill.deleteText(range);
          this.quill.insertText(range.index, "\n", Quill.sources.USER);
          this.quill.insertEmbed(
            range.index,
            "imageResizer1",
            {
              // alt: alt,
              src: src,
            },
            Quill.sources.USER
          );
          this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        } else {
          // console.log(1111);
        }
      },
      // ddd: function () {
      //   this.quill.format("bold", true);
      // },
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
  "imageResizer1",
];
