import "react-quill/dist/quill.snow.css";
import "./Quill.scss";
import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";
import { viewerModulesConfig, editorModulesConfig } from "./quillConfig.js";

// function QuillEditor({ postContent, setPostContent, isViewer = false }) {
//   const quillRef = useRef(null);

//   const handleChangeContent = (newContent) => {
//     setPostContent(newContent);
//   };

//   // const modules = {
//   //   syntax: {
//   //     highlight: (code) => hljs.highlightAuto(code).value,
//   //   },
//   //   toolbar: false,
//   // };

//   const modules = useMemo(() => {
//     if (isViewer) {
//       return {
//         syntax: {
//           highlight: (code) => hljs.highlightAuto(code).value,
//         },
//         toolbar: false,
//       };
//     } else {
//       const Font = Quill.import("formats/font");
//       const BlockEmbed = Quill.import("blots/embed");

//       Font.whitelist = [
//         false,
//         "굴림",
//         "ibmPlexMono",
//         "sans-serif",
//         "serif",
//         "monospace",
//       ];

//       class Image extends BlockEmbed {
//         static create(value) {
//           const node = super.create();

//           node.setAttribute("src", value.src);

//           return node;
//         }

//         static value(node) {
//           return {
//             src: node.getAttribute("src"),
//           };
//         }
//       }

//       Image.blotName = "image";
//       Image.tagName = "img";

//       class ImageResizer1 extends BlockEmbed {
//         static create(value) {
//           const node = super.create();

//           node.setAttribute("src", value.src);

//           return node;
//         }

//         static value(node) {
//           return {
//             src: node.getAttribute("src"),
//           };
//         }
//       }

//       return {
//         syntax: {
//           highlight: (code) => hljs.highlightAuto(code).value,
//         },
//         toolbar: {
//           container: [
//             // { font: [] },
//             // { size: Size.whitelist },
//             { font: Font.whitelist },
//             { size: [] },
//             "custom",
//             "bold",
//             "italic",
//             "underline",
//             "strike",

//             { color: [] },
//             { background: [] },

//             { align: null },
//             { align: "center" },
//             { align: "right" },
//             { align: "justify" },

//             "blockquote",
//             "code",
//             "code-block",
//             "link",
//             "image",
//             "imageResizer1",

//             { list: "ordered" },
//             { list: "bullet" },

//             { indent: "-1" },
//             { indent: "+1" },

//             "clean",
//           ],
//           handlers: {
//             image: function () {
//               const range = this.quill.getSelection(true);

//               const input = document.createElement("input");
//               input.setAttribute("name", "image");
//               input.setAttribute("type", "file");
//               input.click();

//               input.addEventListener("change", async (e) => {
//                 try {
//                   e.preventDefault();

//                   const file = e.target.files[0];

//                   if (file) {
//                     const formData = new FormData();

//                     formData.append("image", file);

//                     // 파일 여러 개
//                     // for (let item of files) {
//                     //   formData.append("image", item);
//                     // }

//                     const response = await api.post("/image", formData);
//                     const status = response.status;
//                     const imageURL = response.data.url;

//                     if (status === 200) {
//                       this.quill.insertEmbed(
//                         range.index,
//                         "image",
//                         { src: imageURL },
//                         Quill.sources.USER
//                       );
//                       // this.quill.insertText(
//                       //   range.index + 1,
//                       //   "\n",
//                       //   Quill.sources.USER
//                       // );
//                       this.quill.setSelection(
//                         range.index + 1,
//                         Quill.sources.SILENT
//                       );
//                     } else {
//                       console.log(status);
//                     }
//                   }
//                 } catch (error) {
//                   console.log(error);
//                 }

//                 // 수정본
//                 //   const reader = new FileReader();

//                 //   if (file) {
//                 //     reader.readAsDataURL(file);
//                 //   }

//                 //   reader.onload = () => {
//                 //     // 읽기가 성공하면 reader.result에 변환된 이미지의 url이 할당됨.
//                 //     const url = reader.result;

//                 //     this.quill.insertEmbed(
//                 //       range.index,
//                 //       "image",
//                 //       { src: url },
//                 //       Quill.sources.USER
//                 //     );
//                 //     this.quill.insertText(range.index + 1, "\n", Quill.sources.USER);
//                 //     this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
//                 //   };
//               });
//             },
//             imageResizer1: function () {
//               const range = this.quill.getSelection(true);

//               const insert = this.quill.getContents(range).ops[0]?.insert;
//               // 선택된 요소가 없다면 ops에 빈 배열이 할당되어 있어서 ops[0]은 undifined가 반횐됨.

//               if (insert?.image || insert?.imageResizer1) {
//                 const src = insert.image?.src || insert.imageResizer1.src;

//                 this.quill.deleteText(range);
//                 this.quill.insertEmbed(
//                   range.index,
//                   "imageResizer1",
//                   {
//                     // alt: alt,
//                     src: src,
//                   },
//                   Quill.sources.USER
//                 );
//                 this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
//               }
//             },
//           },
//         },
//       };
//     }
//   }, [isViewer]);

//   return (
//     <>
//       <div className="wrapper-Quill">
//         <ReactQuill
//           // modules={isViewer ? viewerModulesConfig : editorModulesConfig}
//           modules={modules}
//           readOnly={isViewer ? true : false}
//           value={postContent}
//           onChange={handleChangeContent}
//           ref={quillRef}
//           theme={"snow"}
//         />
//       </div>
//     </>
//   );
// }

// export default QuillEditor;

// const Font = Quill.import("formats/font");
// const BlockEmbed = Quill.import("blots/embed");

// Font.whitelist = [
//   false,
//   "굴림",
//   "ibmPlexMono",
//   "sans-serif",
//   "serif",
//   "monospace",
// ];

// class Image extends BlockEmbed {
//   static create(value) {
//     const node = super.create();

//     node.setAttribute("src", value.src);

//     return node;
//   }

//   static value(node) {
//     return {
//       src: node.getAttribute("src"),
//     };
//   }
// }

// Image.blotName = "image";
// Image.tagName = "img";

// class ImageResizer1 extends BlockEmbed {
//   static create(value) {
//     const node = super.create();

//     node.setAttribute("src", value.src);

//     return node;
//   }

//   static value(node) {
//     return {
//       src: node.getAttribute("src"),
//     };
//   }
// }

// ImageResizer1.blotName = "imageResizer1";
// ImageResizer1.tagName = "img";
// ImageResizer1.className = "imageResizer1";

// Quill.register(Font, true);
// Quill.register(Image, true);
// Quill.register(ImageResizer1, true);

// https://mingeesuh.tistory.com/entry/Quill-React-%EC%97%90%EB%94%94%ED%84%B0-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%82%AC%EC%9D%B4%EC%A6%88-%EC%A1%B0%EC%A0%88

const QuillEditor = forwardRef(
  ({ postContent, setPostContent, isViewer = false }, ref) => {
    const handleChangeContent = (newContent) => {
      setPostContent(newContent);
    };

    useEffect(() => {}, []);

    return (
      <>
        <div className="wrapper-Quill">
          <ReactQuill
            // modules={isViewer ? viewerModulesConfig : editorModulesConfig}
            // modules={modules}
            readOnly={isViewer ? true : false}
            value={postContent}
            onChange={handleChangeContent}
            ref={ref}
            theme={"snow"}
          />
        </div>
      </>
    );
  }
);

export default QuillEditor;

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
