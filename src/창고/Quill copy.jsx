import "react-quill/dist/quill.snow.css";
import "./Quill.scss";
import { forwardRef, useEffect, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";
import api from "../axios/axios.js";

const QuillEditor = forwardRef(({ data }, ref) => {
  const { value = "", onChange = () => {}, readOnly = false } = data;
  // value: 편집기에 표시되는 내용
  // onChange: 편집기에 표시되는 내용을 바꾸는 함수
  // readOnly: 보기(뷰어)/편집(에디터) 모드 변경 boolean값
  // ref: 요소의 dom 데이터
  // - data 객체로 전달이 안 돼서 따로 ref 프롭스로 넘겨줘야 함

  // ▼ quill 초기화 작업
  const Font = Quill.import("formats/font");
  // quill 라이브러리에서 사용되는 폰트 목록을 가져옴
  const BlockEmbed = Quill.import("blots/block/embed");
  // quill 라이브러리에서 커스텀 blot을 만들 block embed 요소를 가져옴

  Font.whitelist = [
    false,
    // false는 기본 폰트로 지정된 폰트를 의미
    "굴림",
    "ibmPlexMono",
    "sans-serif",
    "serif",
    "monospace",
  ];
  // quill에서 사용할 수 있는 폰트 목록을 수정

  const highlight = useMemo(() => (code) => hljs.highlightAuto(code).value, []);
  // 코드블럭에 코드 하이라이터 적용

  // mode가 새로 들어와도 감지가 안 됨. 인스턴스가 새로 생성되는 게 아니기 때문. 그냥 랜더링이 다시 됨.
  // 그래서 const로 선언한 module 변수가 업데이트가 안 됨. state가 아니라 변화를 감지하지 못하는 것.
  // 기존에 세 가지 컴포넌트로 나뉘어 있을 땐 모드가 변경될 때마다 인스턴스가 새로 생성됐음. 다른 컴포넌트니까.
  // 그래서 viewer일 땐 module = viewer가 세팅된 채로 모듈 프롭스에 들어감
  // editor일 때는 modeule = edit가 생성될 채로 모듈 프롭스에 들어감.
  // 근데 이제 합쳐서(readOnly로 초기화 분기) 인스턴스 재생성이 아닌 리랜더가 됨.
  // 리랜더가 되면 mode에 의해서 기존에 들어가 있던 모듈이 바뀜.
  // 모듈이 바뀌면 안 됨. 바뀐 모듈이 적용되는 게 아니라 기존 모듈이 유지되면서 퀼이 랜더링을 멈춤.
  // 그래서 toolbar가 false인 모듈이 적용된 상태에서 getModule로 toolbar를 가져오니까 undefined가 나옴
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
  // 어쩔 수 없이 viewer랑 editor 페이지를 나눔. 초기화할 때 초기화 데이터가 고정되어 있어야 함.
  // 도중에 초기화 데이터가 변경되면 quill이 랜더링을 멈춤.
  // 초기화 데이터를 변경해서 quill을 뷰어로 했다가 에디터로 했다가 하는 건 안 되겠음.
  // useState로 하면 되나? 한번 해봐야겠다.

  // 인스턴스가 재생성되지 않고 초기화 데이터가 바뀌면 랜더링이 진행되지 않음
  // 그래서 뷰어, 라이터, 에디터를 통합하고 mode로 초기화 데이터를 바꿔주는 식으로 구성하면
  // 뷰어 -> 라이터/에디터로 넘어갈 때 quill이 제대로 랜더링되지 않음
  // 인스턴스가 재생성되지 않고 mode에 따라 초기화 데이터만 교체됐으니까
  // 해결: 페이지를 뷰어/라이터&에디터 페이지를 나눔. 즉, 페이지가 바뀔 때마다 quill 인스턴스가 재생성되게 만듦.

  const modules = useMemo(
    () =>
      readOnly
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
                // { align: "right" },
                // { align: "justify" },

                "blockquote",
                "code",
                "code-block",
                "link",
                "image",
                // "imageResizer300",
                // "imageResizer500",
                // "imageResizerFree",

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
    if (readOnly) {
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
    }

    // 편집기(편집, 생성)
    if (!readOnly) {
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
  }, [ref, readOnly]);

  return (
    <>
      <div className="wrapper-Quill">
        <ReactQuill
          modules={modules}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          ref={ref}
          theme={"snow"}
        />
      </div>
    </>
  );
});

export default QuillEditor;
