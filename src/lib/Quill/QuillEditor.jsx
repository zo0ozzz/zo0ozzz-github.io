import "./Quill.scss";
import "react-quill/dist/quill.snow.css";
import { forwardRef, useCallback, useMemo, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";

const QuillEditor = forwardRef(({ className, value, onChange }, ref) => {
  const handleChangeQuillEditor = (newValue) => onChange(newValue);

  const Font = Quill.import("formats/font");

  Font.whitelist = [
    false,
    // - false는 기본 폰트(시스템에 지정된 폰트)로 지정된 폰트를 의미.
    // - 기본 폰트로 설정된 문자 요소에는 따로 ql-font-굴림 같은 css 셀렉터가 들어가지 않음.
    // - 그래서 문자가 app.scss에서 전역으로 설정된 폰트로 그려지는 것!
    "굴림",
    "ibmPlexMono",
    "sans-serif",
    "serif",
    "monospace",
  ];

  Quill.register(Font, true);

  const highlight = useCallback((code) => hljs.highlightAuto(code).value, []);

  const modules = useMemo(
    () => ({
      keyboard: {
        bindings: {
          "list autofill": null,
        },
      },
      syntax: {
        // 코드 하이라이터
        highlight: highlight,
        // - value에는 대상 문자를 리턴하는 '함수'를 등록해줌.
        // - 이 함수가 작동해서 대상 문자들을 매개변수로 받은 다음에 하이라이팅 된 태그에 넣어 반환함.
        // - 그러니까 '함수'를 넣어줘야 함. 대상 문자를 어떻게 해서 요소로 반환할지 설명한 '함수'!
        interval: 0,
      },
      toolbar: {
        container: [
          { font: Font.whitelist },
          { size: [] },
          "bold",
          "italic",
          "underline",
          "strike",

          { color: [] },
          { background: [] },

          { align: null },
          { align: "center" },

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
      },
    }),
    []
  );

  useEffect(() => {
    if (!ref.current) return;

    const BlockEmbed = Quill.import("blots/block/embed");

    class Image extends BlockEmbed {
      static create(value) {
        const node = super.create();
        node.setAttribute("src", value.src);
        if (value.size) {
          node.style.width = value.size;

          return node;
        } else {
          return node;
        }
      }

      static value(node) {
        return {
          src: node.getAttribute("src"),
          size: node.style.width,
        };
      }
    }

    Image.blotName = "image";
    Image.tagName = "img";

    Quill.register(Image, true);

    const quillInstance = ref.current.getEditor();

    const handleClickImageButton = () => {
      const range = quillInstance.getSelection(true);
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
              quillInstance.insertEmbed(
                range.index,
                "image",
                { src: imageURL },
                Quill.sources.USER
              );
              quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
            } else {
              console.log(status);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    };

    const toolbar = quillInstance.getModule("toolbar");

    toolbar.addHandler("image", handleClickImageButton);
  }, [ref]);

  return (
    <ReactQuill
      // className={className}
      className="quillPost"
      value={value}
      onChange={handleChangeQuillEditor}
      modules={modules}
      theme={"snow"}
      ref={ref}
    />
  );
});

export default QuillEditor;
