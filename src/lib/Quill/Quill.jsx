import "react-quill/dist/quill.snow.css";
import "./Quill.scss";
import { forwardRef, useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";
// import { viewerModulesConfig, editorModulesConfig } from "./quillConfig.js";

function QuillEditor({ postContent, setPostContent, isViewer = false }) {
  const [ModuleConfig, setModuleConfig] = useState({});
  const quillRef = useRef();

  const handleChangeContent = (newContent) => {
    setPostContent(newContent);
  };

  useEffect(() => {
    if (!quillRef.current) return;

    const quillInstance = quillRef.current.getEditor();

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

    // if (isViewer) {
    //   const viewerModuleConfig = {
    //     toolbar: false,
    //     syntax: {
    //       highlight: (text) => hljs.highlightAuto(text).value,
    //     },
    //   };

    //   setModuleConfig(viewerModuleConfig);

    //   return;
    // }

    // if (!isViewer) {
    //   const editorModulesConfig = {
    //     syntax: {
    //       highlight: (text) => hljs.highlightAuto(text).value,
    //       // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
    //       // highlight: true,
    //     },
    //     toolbar: {
    //       container: [
    //         // { font: [] },
    //         // { size: Size.whitelist },
    //         { font: Font.whitelist },
    //         { size: [] },
    //         "custom",
    //         "bold",
    //         "italic",
    //         "underline",
    //         "strike",

    //         { color: [] },
    //         { background: [] },

    //         { align: null },
    //         { align: "center" },
    //         { align: "right" },
    //         { align: "justify" },

    //         "blockquote",
    //         "code",
    //         "code-block",
    //         "link",
    //         "image",
    //         "imageResizer1",

    //         { list: "ordered" },
    //         { list: "bullet" },

    //         { indent: "-1" },
    //         { indent: "+1" },

    //         "clean",
    //       ],
    //       handlers: {
    //         image: function () {
    //           const range = quillInstance.getSelection(true);

    //           const input = document.createElement("input");
    //           input.setAttribute("name", "image");
    //           input.setAttribute("type", "file");
    //           input.click();

    //           input.addEventListener("change", async (e) => {
    //             try {
    //               e.preventDefault();

    //               const file = e.target.files[0];

    //               if (file) {
    //                 const formData = new FormData();

    //                 formData.append("image", file);

    //                 // 파일 여러 개
    //                 // for (let item of files) {
    //                 //   formData.append("image", item);
    //                 // }

    //                 const response = await api.post("/image", formData);
    //                 const status = response.status;
    //                 const imageURL = response.data.url;

    //                 if (status === 200) {
    //                   quillInstance.insertEmbed(
    //                     range.index,
    //                     "image",
    //                     { src: imageURL },
    //                     quillInstance.sources.USER
    //                   );
    //                   // quillInstance.insertText(
    //                   //   range.index + 1,
    //                   //   "\n",
    //                   //   quillInstance.sources.USER
    //                   // );
    //                   quillInstance.setSelection(
    //                     range.index + 1,
    //                     quillInstance.sources.SILENT
    //                   );
    //                 } else {
    //                   console.log(status);
    //                 }
    //               }
    //             } catch (error) {
    //               console.log(error);
    //             }

    //             // 수정본
    //             //   const reader = new FileReader();

    //             //   if (file) {
    //             //     reader.readAsDataURL(file);
    //             //   }

    //             //   reader.onload = () => {
    //             //     // 읽기가 성공하면 reader.result에 변환된 이미지의 url이 할당됨.
    //             //     const url = reader.result;

    //             //     quillInstance.insertEmbed(
    //             //       range.index,
    //             //       "image",
    //             //       { src: url },
    //             //       quillInstance.sources.USER
    //             //     );
    //             //     quillInstance.insertText(range.index + 1, "\n", quillInstance.sources.USER);
    //             //     quillInstance.setSelection(range.index + 2, quillInstance.sources.SILENT);
    //             //   };
    //           });
    //         },
    //         imageResizer1: function () {
    //           const range = quillInstance.getSelection(true);

    //           const insert = quillInstance.getContents(range).ops[0]?.insert;
    //           // 선택된 요소가 없다면 ops에 빈 배열이 할당되어 있어서 ops[0]은 undifined가 반횐됨.

    //           if (insert?.image || insert?.imageResizer1) {
    //             const src = insert.image?.src || insert.imageResizer1.src;

    //             quillInstance.deleteText(range);
    //             quillInstance.insertEmbed(
    //               range.index,
    //               "imageResizer1",
    //               {
    //                 // alt: alt,
    //                 src: src,
    //               },
    //               quillInstance.sources.USER
    //             );
    //             quillInstance.setSelection(
    //               range.index + 1,
    //               quillInstance.sources.SILENT
    //             );
    //           }
    //         },
    //       },
    //     },
    //   };

    //   setModuleConfig(editorModulesConfig);
    // }
  }, []);

  return (
    <>
      <div className="wrapper-Quill">
        <ReactQuill
          // modules={isViewer ? viewerModulesConfig : editorModulesConfig}
          modules={ModuleConfig}
          readOnly={isViewer ? true : false}
          value={postContent}
          onChange={handleChangeContent}
          ref={quillRef}
          theme={"snow"}
        />
      </div>
    </>
  );
}

export default QuillEditor;

// const Quill = forwardRef(
//   ({ postContent, setPostContent, isViewer = false }, ref) => {
//     const handleChangeContent = (newContent) => {
//       setPostContent(newContent);
//     };

//     useEffect(() => {
//       const quillInstance = ref.current.getEditor();

//     }, []);

//     return (
//       <>
//         <div className="wrapper-Quill">
//           <ReactQuill
//             modules={isViewer ? viewerModulesConfig : editorModulesConfig}
//             readOnly={isViewer ? true : false}
//             value={postContent}
//             onChange={handleChangeContent}
//             ref={ref}
//             theme={"snow"}
//           />
//         </div>
//       </>
//     );
//   }
// );

// export default Quill;

// export default function Editor({ initialValue, onChange }) {
//   const [value, setValue] = useState(initialValue);
//   // const selectionRef = useRef("");
//   const quillRef = useRef(null);

//   const handleChange = (content, delta, source, editor) => {
//     setValue(content);
//     onChange(content);
//   };

//   const handleChangeSelection = (range, source, editor) => {
//     const selection = editor.getSelection();

//     const format = editor.getContent(1, 2);

//     console.log(format);

//     // if (quillRef.current !== null) {
//     //   const selection = editor.getSelection();
//     //   const format = quillRef.current.getFormat(selection);
//     //   console.log(format);
//     // } else {
//     //   console.log(111);
//     // }
//   };

//   return (
//     <>
//       <div className="wrapper-Editor">
//         <ReactQuill
//           ref={quillRef}
//           value={value}
//           onChange={handleChange}
//           onChangeSelection={handleChangeSelection}
//           modules={editorModulesConfig}
//           theme={"snow"}
//         />
//       </div>
//     </>
//   );
// }

// useEffect(() => {
//   const handleClick = (e) => {
//     // e.preventDefault();

//     console.log(e.target.tagName);

//     if (e.target.tagName === "IMG") {
//       e.target.parentNode.classList.add("ql-300");

//       const newHTML = document.querySelector(".ql-editor").innerHTML;

//       handleChange(newHTML);
//       // }

//       // e.preventDefault();

//       // if (e.target.tagName === "IMG") {
//       //   const answer = prompt("사이즈를 입력하세요.");

//       //   if (answer === "300") {
//       //     e.target.classList.remove("삼백", "오백");
//       //     e.target.classList.add("삼백");
//       //   } else if (answer === "500") {
//       //     e.target.classList.remove("삼백", "오백");
//       //     e.target.classList.add("오백");
//       //   } else {
//       //     console.log("없는 입력");
//       //   }

//       //   const newHTML = document.querySelector(".ql-editor").innerHTML;

//       //   setValue(newHTML);
//     }

//     console.log("콘솔: ", ref.current);
//   };

//   ref.current.editor.root.addEventListener("click", handleClick);
// }, []);

// {
//   buttonState ? (
//     <div className="buttons">
//       <button className="버튼">300</button>
//       <button className="버튼">500</button>
//       <button className="버튼">원래</button>
//     </div>
//   ) : null;
// }
