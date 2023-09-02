// imageBox 블랏 폐기
import "react-quill/dist/quill.snow.css";
import "./Quill.scss";
import { createElement, forwardRef, useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";

const QuillEditor = forwardRef(
  ({ postContent, setPostContent, isViewer = false }, ref) => {
    const handleChangeContent = (newContent) => {
      setPostContent(newContent);
      console.log("감지");
    };

    const handleChangeSelection = () => {};

    const Font = Quill.import("formats/font");
    const BlockEmbed = Quill.import("blots/block/embed");

    Font.whitelist = [
      false,
      "굴림",
      "ibmPlexMono",
      "sans-serif",
      "serif",
      "monospace",
    ];

    const highlight = useMemo(
      () => (code) => hljs.highlightAuto(code).value,
      []
    );

    // mode가 새로 들어와도 감지가 안 됨. 인스턴스가 새로 생성되는 게 아니기 때문. 그냥 랜더링이 다시 됨.
    // 그래서 const로 선언한 module 변수가 업데이트가 안 됨. state가 아니라 변화를 감지하지 못하는 것.
    // 기존에 세 가지 컴포넌트로 나뉘어 있을 땐 모드가 변경될 때마다 인스턴스가 새로 생성됐음.
    // 그래서 viewer일 땐 module = viewer가 세팅된 채로 모듈 프롭스에 들어감
    // editor일 때는 modeule = edit가 생성될 채로 모듈 프롭스에 들어감.
    // 근데 이제 합쳐서 인스턴스 재생성이 아닌 리랜더가 됨.
    // 리랜더가 되면 mode에 의해서 기존에 들어가 있던 모듈이 바뀜.
    // 모듈이 바뀌면 안 됨. 바뀐 모듈이 적용되는 게 아니라 기존 모듈이 유지되면서 퀼이 랜더링을 멈춤.
    // 그래서 toolbar가 false인 모듈이 적용된 상태에서 getModule로 toolbvawr를 가져오니까 undefined가 나옴
    // 그래서 addHandler 함수를 실행시킬 수가 없음.
    // 그래서 오류가 남.
    // 답은? useMemo로 값을 저장해놓는 것.
    // 그럼 module이 바뀌는 게 아님. 아니 모듈에서 적용되는 module은 바뀌지만 module 안에 들어가 있느 ㄴ값 자체는 그대로움.
    // 왜냐면 memo를 해놨으니까.
    // !!이거 안 됨!
    // 왜냐면.. 어차피 모듈이 바뀌는 것 마찬가지기 때문...
    // 모듈을 바꿀 때는 아무튼 퀼 인스턴스가 새로 생성되어야 함.
    // 모듈은 고정된 모듈을 제공해야 하기 때문!
    // 아니면 안 바뀜.
    const modules = useMemo(
      () =>
        isViewer
          ? {
              syntax: {
                highlight: highlight,
                interval: 0,
              },
              toolbar: false,
            }
          : {
              syntax: {
                highlight: highlight,
                interval: 0,
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
                  "imageBox",

                  { list: "ordered" },
                  { list: "bullet" },

                  { indent: "-1" },
                  { indent: "+1" },

                  "clean",
                ],
              },
            },
      []
    );

    useEffect(() => {
      if (!ref.current) return;
      class Image extends BlockEmbed {
        static create(value) {
          const node = super.create();

          // node.addEventListener("click", (e) => {
          //   const target = e.target;
          //   const findResult = Quill.find(target, false);
          //   const index = ref.current.getEditor().getIndex(findResult);
          //   ref.current.getEditor().setSelection(index, 1);
          // });

          node.addEventListener("click", (e) => {
            const target = e.target;

            const resizeButton1 = document.createElement("input");
            resizeButton1.setAttribute("type", "button");
            resizeButton1.setAttribute("value", "button");
            console.log(1);
            target.append(resizeButton1);
          });

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

      class ImageBox extends BlockEmbed {
        static create(value) {
          const node = super.create();
          node.style.border = "1px solid";

          const wrapper = document.createElement("div");
          wrapper.style.border = "1px solid";
          wrapper.classList.add("wrapper");

          const image = document.createElement("img");
          image.setAttribute("src", value.src);

          wrapper.insertAdjacentElement("beforeEnd", image);

          const buttonContainer = document.createElement("span");
          buttonContainer.style.display = "none";
          buttonContainer.style.position = "absolute";

          const button = document.createElement("input");
          button.setAttribute("type", "button");
          button.setAttribute("value", "버튼");

          buttonContainer.insertAdjacentElement("beforeEnd", button);
          wrapper.insertAdjacentElement("beforeEnd", buttonContainer);

          node.insertAdjacentElement("beforeEnd", wrapper);
          return node;
        }

        static value(node) {
          const src = node.querySelector("img").getAttribute("src");
          return { src: src };
        }
      }

      ImageBox.blotName = "imageBox";
      ImageBox.tagName = "div";
      ImageBox.className = "imageBox";

      Quill.register(Font, true);
      Quill.register(Image, true);
      Quill.register(ImageResizer1, true);
      Quill.register(ImageBox, true);

      if (isViewer) return;

      if (!isViewer) {
        function handleClickImageButton() {
          const quillInstance = ref.current.getEditor();
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
                  // quillInstance.insertText(
                  //   range.index + 1,
                  //   "\n",
                  //   Quill.sources.USER
                  // );
                  quillInstance.setSelection(
                    range.index + 1,
                    Quill.sources.SILENT
                  );
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

            //     quillInstance.insertEmbed(
            //       range.index,
            //       "image",
            //       { src: url },
            //       Quill.sources.USER
            //     );
            //     quillInstance.insertText(range.index + 1, "\n", Quill.sources.USER);
            //     quillInstance.setSelection(range.index + 2, Quill.sources.SILENT);
            //   };
          });
        }

        function handleClickImageResizer1Button() {
          const quillInstance = ref.current.getEditor();

          const range = quillInstance.getSelection(true);

          const insert = quillInstance.getContents(range).ops[0]?.insert;
          // 선택된 요소가 없다면 ops에 빈 배열이 할당되어 있어서 ops[0]은 undifined가 반횐됨.

          if (insert?.image || insert?.imageResizer1) {
            const src = insert.image?.src || insert.imageResizer1.src;

            quillInstance.deleteText(range);
            quillInstance.insertEmbed(
              range.index,
              "imageResizer1",
              {
                // alt: alt,
                src: src,
              },
              Quill.sources.USER
            );
            quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
          }
        }

        function handleClickImageBoxButton() {
          const quillInstance = ref.current.getEditor();
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
                    "imageBox",
                    { src: imageURL },
                    Quill.sources.USER
                  );
                  // quillInstance.insertText(
                  //   range.index + 1,
                  //   "\n",
                  //   Quill.sources.USER
                  // );
                  quillInstance.setSelection(
                    range.index + 1,
                    Quill.sources.SILENT
                  );
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

            //     quillInstance.insertEmbed(
            //       range.index,
            //       "image",
            //       { src: url },
            //       Quill.sources.USER
            //     );
            //     quillInstance.insertText(range.index + 1, "\n", Quill.sources.USER);
            //     quillInstance.setSelection(range.index + 2, Quill.sources.SILENT);
            //   };
          });
        }

        const quillInstance = ref.current.getEditor();

        const toolbar = quillInstance.getModule("toolbar");

        toolbar.addHandler("imageResizer1", handleClickImageResizer1Button);
        toolbar.addHandler("image", handleClickImageButton);
        toolbar.addHandler("imageBox", handleClickImageBoxButton);
      }
    }, [ref, isViewer]);

    return (
      <>
        <div className="wrapper-Quill">
          <ReactQuill
            modules={modules}
            readOnly={isViewer ? true : false}
            value={postContent}
            onChange={handleChangeContent}
            onChangeSelection={handleChangeSelection}
            ref={ref}
            theme={"snow"}
          />
        </div>
      </>
    );
  }
);

export default QuillEditor;

// function QuillEditor({ postContent, setPostContent, isViewer = false }) {
//   const quillRef = useRef(null);

//   const handleChangeContent = (newContent) => {
//     setPostContent(newContent);
//   };

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
