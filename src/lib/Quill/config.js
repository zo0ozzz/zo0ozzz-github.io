import { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";

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

class Image extends BlockEmbed {
  static create(value) {
    const node = super.create();

    node.setAttribute("src", value.src);

    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute("src"),
    };
  }
}

Image.blotName = "image";
Image.tagName = "img";

class ImageResizer1 extends BlockEmbed {
  static create(value) {
    const node = super.create();

    node.setAttribute("src", value.src);

    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute("src"),
    };
  }
}

ImageResizer1.blotName = "imageResizer1";
ImageResizer1.tagName = "img";
ImageResizer1.className = "imageResizer1";

Quill.register(Font, true);
Quill.register(Image, true);
Quill.register(ImageResizer1, true);

// * modules config

// for viewer(post)
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

// for editor(edit & create)
export const editorModulesConfig = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
    // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
    // highlight: true,
  },
  toolbar: {
    container: [
      // { font: [] },
      // { size: Size.whitelist },
      { font: Font.whitelist },
      { size: [] },
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
      "imageResizer1",

      { list: "ordered" },
      { list: "bullet" },

      { indent: "-1" },
      { indent: "+1" },

      "clean",
    ],
    handlers: {
      image: function () {
        const range = this.quill.getSelection(true);

        const input = document.createElement("input");
        input.setAttribute("name", "image");
        input.setAttribute("type", "file");
        input.click();

        input.addEventListener("change", async (e) => {
          try {
            e.preventDefault();

            const file = e.target.files[0];

            if (file) {
              const formData = new FormData();

              formData.append("image", file);

              // 파일 여러 개
              // for (let item of files) {
              //   formData.append("image", item);
              // }

              const response = await api.post("/image", formData);
              const status = response.status;
              const imageURL = response.data.url;

              if (status === 200) {
                this.quill.insertEmbed(
                  range.index,
                  "image",
                  { src: imageURL },
                  Quill.sources.USER
                );
                // this.quill.insertText(
                //   range.index + 1,
                //   "\n",
                //   Quill.sources.USER
                // );
                this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
              } else {
                console.log(status);
              }
            }
          } catch (error) {
            console.log(error);
          }

          // 수정본
          //   const reader = new FileReader();

          //   if (file) {
          //     reader.readAsDataURL(file);
          //   }

          //   reader.onload = () => {
          //     // 읽기가 성공하면 reader.result에 변환된 이미지의 url이 할당됨.
          //     const url = reader.result;

          //     this.quill.insertEmbed(
          //       range.index,
          //       "image",
          //       { src: url },
          //       Quill.sources.USER
          //     );
          //     this.quill.insertText(range.index + 1, "\n", Quill.sources.USER);
          //     this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
          //   };
        });
      },
      imageResizer1: function () {
        const range = this.quill.getSelection(true);

        const insert = this.quill.getContents(range).ops[0]?.insert;
        // 선택된 요소가 없다면 ops에 빈 배열이 할당되어 있어서 ops[0]은 undifined가 반횐됨.

        if (insert?.image || insert?.imageResizer1) {
          const src = insert.image?.src || insert.imageResizer1.src;

          this.quill.deleteText(range);
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
        }
      },
    },
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
  "imageResizer1",
  "code",
  "code-block",
];
