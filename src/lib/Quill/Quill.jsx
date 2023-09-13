import "react-quill/dist/quill.snow.css";
import "./Quill.scss";
import { forwardRef, useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";

const QuillEditor = forwardRef(
  ({ postContent, setPostContent, isViewer = false }, ref) => {
    const handleChangeContent = (newContent) => {
      setPostContent(newContent);
    };

    const handleChangeSelection = (newSelection, oldRange, source) => {};

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

        Quill.register(Font, true);
        Quill.register(Image, true);
      }

      // 편집기(편집, 생성)
      if (!isViewer) {
        const quillInstance = ref.current.getEditor();
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

        Quill.register(Font, true);
        Quill.register(Image, true);

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
          });
        }

        const toolbar = quillInstance.getModule("toolbar");

        toolbar.addHandler("image", handleClickImageButton);
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
