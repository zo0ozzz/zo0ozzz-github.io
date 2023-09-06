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

    const handleChangeSelection = (newSelection, oldRange, source) => {
      console.log("newSelection", newSelection);

      // const imageResizePrompt = document.querySelector(".imageResizePrompt");
      // imageResizePrompt.classList.add("hidden");
    };

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
                  "imageResizer300",
                  "imageResizer500",
                  "imageResizerFree",

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

      // 편집기(뷰어)
      if (isViewer) {
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
        class ImageResizer300 extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);
            node.style.width = "300px";

            return node;
          }

          static value(node) {
            return {
              src: node.getAttribute("src"),
            };
          }
        }

        ImageResizer300.blotName = "imageResizer300";
        ImageResizer300.tagName = "img";

        class ImageResizer500 extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);
            node.style.width = "500px";

            return node;
          }

          static value(node) {
            return {
              src: node.getAttribute("src"),
            };
          }
        }

        ImageResizer500.blotName = "imageResizer500";
        ImageResizer500.tagName = "img";
        class ImageResizerFree extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);
            node.style.width = value.size;

            return node;
          }

          static value(node) {
            return {
              src: node.getAttribute("src"),
              size: node.style.width,
            };
          }
        }

        ImageResizerFree.blotName = "imageResizerFree";
        ImageResizerFree.tagName = "img";

        Quill.register(Font, true);
        Quill.register(Image, true);
        Quill.register(ImageResizer300, true);
        Quill.register(ImageResizer500, true);
        Quill.register(ImageResizerFree, true);
      }

      // 편집기(편집, 생성)
      if (!isViewer) {
        const quillInstance = ref.current.getEditor();

        const div = document.createElement("div");
        div.style.border = "1px solid";
        div.style.padding = "2px";
        div.classList.add("imageResizePrompt");
        div.classList.add("hidden");

        const sizeInput = document.createElement("input");
        sizeInput.setAttribute("type", "text");
        sizeInput.setAttribute("placeholder", "신사답게 입력해.");
        // sizeInput.addEventListener("blur", () => {
        //   console.log("블러");

        //   div.classList.add("hidden");
        // });

        const button1 = document.createElement("input");
        button1.setAttribute("type", "button");
        button1.setAttribute("value", "변경");
        button1.id = "button1";

        const button2 = document.createElement("input");
        button2.setAttribute("type", "button");
        button2.setAttribute("value", "300");
        button2.addEventListener("click", () => {
          div.classList.add("hidden");
          handleClickImageResizer300Button();
        });

        const button3 = document.createElement("input");
        button3.setAttribute("type", "button");
        button3.setAttribute("value", "500");
        button3.addEventListener("click", () => {
          div.classList.add("hidden");
          handleClickImageResizer500Button();
        });

        div.insertAdjacentElement("beforeend", sizeInput);
        div.insertAdjacentElement("beforeend", button1);
        div.insertAdjacentElement("beforeend", button2);
        div.insertAdjacentElement("beforeend", button3);

        quillInstance.addContainer(div);
        class Image extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);

            node.addEventListener("click", (e) => {
              const target = e.target;
              const findedByDOM = Quill.find(target, false);
              const elementIndex = quillInstance.getIndex(findedByDOM);
              quillInstance.setSelection(elementIndex, 1);
              // const position = quillInstance.getBounds(elementIndex, 1);

              // const imageResizePrompt =
              //   document.querySelector(".imageResizePrompt");

              // // imageResizePrompt.style.transform = "translate(-50%)";
              // // imageResizePrompt.style.left = "50%";
              // // imageResizePrompt.style.top = position.bottom + 10 + "px";

              // imageResizePrompt.classList.toggle("hidden");
            });
            // });

            // 이미지를 클릭하면 해당 이미지가 selection 되게 작업.
            // - 이미지의 크기를 조정하려면 해당 요소를 selection 해야 하는데 클릭만으로는 quill에서 감지를 못 했음.
            // - dom 요소로 quill의 요소를 선택해는 방법을 고민하고 별 시도를 다 해보다가 어이없게도 find 메서드를 발견.
            //  - 역시 설명서에 답이 있었다.. 설명서를 잘 읽자.
            // node.addEventListener("click", (e) => {

            //   // const resizeTool = document.querySelector("#id");

            //   const target = e.target;
            //   const findedByDOM = Quill.find(target, false);
            //   const elementIndex = quillInstance.getIndex(findedByDOM);
            //   quillInstance.setSelection(elementIndex, 1);
            // });

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
        class ImageResizer300 extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);
            node.style.width = "300px";
            node.addEventListener("click", (e) => {
              const target = e.target;
              const findedByDOM = Quill.find(target, false);
              const elementIndex = quillInstance.getIndex(findedByDOM);
              quillInstance.setSelection(elementIndex, 1);
            });

            return node;
          }

          static value(node) {
            return {
              src: node.getAttribute("src"),
            };
          }
        }

        ImageResizer300.blotName = "imageResizer300";
        ImageResizer300.tagName = "img";

        class ImageResizer500 extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);
            node.style.width = "500px";
            console.log(500);
            node.addEventListener("click", (e) => {
              const target = e.target;
              const findedByDOM = Quill.find(target, false);
              const elementIndex = quillInstance.getIndex(findedByDOM);
              quillInstance.setSelection(elementIndex, 1);
            });

            return node;
          }

          static value(node) {
            return {
              src: node.getAttribute("src"),
            };
          }
        }

        ImageResizer500.blotName = "imageResizer500";
        ImageResizer500.tagName = "img";
        class ImageResizerFree extends BlockEmbed {
          static create(value) {
            const node = super.create();
            node.setAttribute("src", value.src);

            node.style.width = value.size;

            // node.addEventListener("click", (e) => {
            //   const target = e.target;
            //   const findedByDOM = Quill.find(target, false);
            //   const elementIndex = quillInstance.getIndex(findedByDOM);
            //   quillInstance.setSelection(elementIndex, 1);
            // });

            return node;
          }

          static value(node) {
            return {
              src: node.getAttribute("src"),
              size: node.style.width,
            };
          }
        }

        ImageResizerFree.blotName = "imageResizerFree";
        ImageResizerFree.tagName = "img";

        Quill.register(Font, true);
        Quill.register(Image, true);
        Quill.register(ImageResizer300, true);
        Quill.register(ImageResizer500, true);
        Quill.register(ImageResizerFree, true);

        function handleClickImageButton() {
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

        function getImageSrc(range) {
          const imageBlots = [
            "image",
            "imageResizer300",
            "imageResizer500",
            "imageResizerFree",
          ];
          const content = quillInstance.getContents(range);
          const isSelection = content.ops[0];
          if (isSelection === null) {
            console.log("선택한 요소가 없습니다.");
            return;
          }
          const insert = content.ops[0]?.insert;
          if (typeof insert !== "object") {
            console.log("선택한 요소는 이미지가 아닙니다.");
            return;
          }
          let imageBlotName = "";
          for (let i = 0; i < imageBlots.length; i++) {
            if (imageBlots[i] in insert) {
              imageBlotName = imageBlots[i];
              break;
            }
          }
          const src = content.ops[0]?.insert[imageBlotName].src;

          return src;
        }

        function handleClickImageResizer300Button() {
          const range = quillInstance.getSelection(true);
          const src = getImageSrc(range);
          if (!src) {
            return;
          }
          if (src) {
            quillInstance.deleteText(range);
            quillInstance.insertEmbed(
              range.index,
              "imageResizer300",
              { src: src },
              Quill.sources.USER
            );
            quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
          }
        }

        function handleClickImageResizer500Button() {
          const range = quillInstance.getSelection(true);
          const src = getImageSrc(range);
          if (!src) {
            return;
          }
          if (src) {
            quillInstance.deleteText(range);
            quillInstance.insertEmbed(
              range.index,
              "imageResizer500",
              { src: src },

              Quill.sources.USER
            );
            quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
          }
        }

        function handleClickImageResizerFreeButton(inputValue, range) {
          // const answer = prompt("변경할 가로 너비(px)를 입력하세요.");
          if (Number(inputValue) === 0) {
            console.log("오류");
            return;
          }
          if (isNaN(Number(inputValue)) === true) {
            console.log("입력값이 숫자가 아닙니다.");
            return;
          }
          const size = Number(inputValue);

          // const range = quillInstance.getSelection(true);
          const src = getImageSrc(range);
          if (!src) {
            return;
          }
          if (src) {
            quillInstance.deleteText(range);
            quillInstance.insertEmbed(
              range.index,
              "imageResizerFree",
              { src: src, size: size + "px" },
              Quill.sources.USER
            );
            quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);
          }
        }

        const toolbar = quillInstance.getModule("toolbar");

        toolbar.addHandler("image", handleClickImageButton);
        toolbar.addHandler("imageResizer300", handleClickImageResizer300Button);
        toolbar.addHandler("imageResizer500", handleClickImageResizer500Button);

        // toolbar.addHandler(
        //   "imageResizerFree",
        //   handleClickImageResizerFreeButton
        // );
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
