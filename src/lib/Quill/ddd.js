// import { quillInstance } from "react-quill";
// import hljs from "../hljs/hljs.js";
// import api from "../axios/axios.js";

// // * modules config

// // for viewer(post)
// export const viewerModulesConfig = {
//   // 툴바 X
//   toolbar: false,
//   // hljs 적용.
//   // syntax: true,
//   syntax: {
//     highlight: (text) => hljs.highlightAuto(text).value,
//     // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
//   },
// };

// // for editor(edit & create)
// export const editorModulesConfig = {
//   syntax: {
//     highlight: (text) => hljs.highlightAuto(text).value,
//     // highlight: (text) => hljs.highlight(text, { language: "javascript" }).value,
//     // highlight: true,
//   },
//   toolbar: {
//     container: [
//       // { font: [] },
//       // { size: Size.whitelist },
//       { font: Font.whitelist },
//       { size: [] },
//       "custom",
//       "bold",
//       "italic",
//       "underline",
//       "strike",

//       { color: [] },
//       { background: [] },

//       { align: null },
//       { align: "center" },
//       { align: "right" },
//       { align: "justify" },

//       "blockquote",
//       "code",
//       "code-block",
//       "link",
//       "image",
//       "imageResizer1",

//       { list: "ordered" },
//       { list: "bullet" },

//       { indent: "-1" },
//       { indent: "+1" },

//       "clean",
//     ],
//     handlers: {
//       image: function () {
//         const range = quillInstance.getSelection(true);

//         const input = document.createElement("input");
//         input.setAttribute("name", "image");
//         input.setAttribute("type", "file");
//         input.click();

//         input.addEventListener("change", async (e) => {
//           try {
//             e.preventDefault();

//             const file = e.target.files[0];

//             if (file) {
//               const formData = new FormData();

//               formData.append("image", file);

//               // 파일 여러 개
//               // for (let item of files) {
//               //   formData.append("image", item);
//               // }

//               const response = await api.post("/image", formData);
//               const status = response.status;
//               const imageURL = response.data.url;

//               if (status === 200) {
//                 quillInstance.insertEmbed(
//                   range.index,
//                   "image",
//                   { src: imageURL },
//                   quillInstance.sources.USER
//                 );
//                 // quillInstance.insertText(
//                 //   range.index + 1,
//                 //   "\n",
//                 //   quillInstance.sources.USER
//                 // );
//                 quillInstance.setSelection(range.index + 1, quillInstance.sources.SILENT);
//               } else {
//                 console.log(status);
//               }
//             }
//           } catch (error) {
//             console.log(error);
//           }

//           // 수정본
//           //   const reader = new FileReader();

//           //   if (file) {
//           //     reader.readAsDataURL(file);
//           //   }

//           //   reader.onload = () => {
//           //     // 읽기가 성공하면 reader.result에 변환된 이미지의 url이 할당됨.
//           //     const url = reader.result;

//           //     quillInstance.insertEmbed(
//           //       range.index,
//           //       "image",
//           //       { src: url },
//           //       quillInstance.sources.USER
//           //     );
//           //     quillInstance.insertText(range.index + 1, "\n", quillInstance.sources.USER);
//           //     quillInstance.setSelection(range.index + 2, quillInstance.sources.SILENT);
//           //   };
//         });
//       },
//       imageResizer1: function () {
//         const range = quillInstance.getSelection(true);

//         const insert = quillInstance.getContents(range).ops[0]?.insert;
//         // 선택된 요소가 없다면 ops에 빈 배열이 할당되어 있어서 ops[0]은 undifined가 반횐됨.

//         if (insert?.image || insert?.imageResizer1) {
//           const src = insert.image?.src || insert.imageResizer1.src;

//           quillInstance.deleteText(range);
//           quillInstance.insertEmbed(
//             range.index,
//             "imageResizer1",
//             {
//               // alt: alt,
//               src: src,
//             },
//             quillInstance.sources.USER
//           );
//           quillInstance.setSelection(range.index + 1, quillInstance.sources.SILENT);
//         }
//       },
//     },
//   },
// };

// // * formats
// export const formats = [
//   // 모든 포멧
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "imageResizer1",
//   "code",
//   "code-block",
// ];
