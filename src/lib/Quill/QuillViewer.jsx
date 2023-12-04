import "./Quill.scss";
import "react-quill/dist/quill.snow.css";
import { useEffect, useCallback, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "../hljs/hljs.js";

const QuillViewer = ({ className, value, onChange }) => {
  const handleChangeQuillViewer = (newValue) => onChange(newValue);

  const highlight = useCallback((code) => hljs.highlightAuto(code).value, []);

  const modules = useMemo(
    // - modules 값이 변경되면 컴포넌트가 죽어버린다.
    //  - 왜인지는 모르겠다.
    // - 해결 방법은
    // - 1. modules를 이루는 값들을 고정시키든가(재렌더링에 영향을 받지 않도록 고정)
    //  - const로 선언한 값의 경우 렌더링 시마다 변수에 새 값이 할당된다.
    // - 2. modules를 재렌더링 시에 재할당되지 않도록 고정하면 컴포넌트가 죽지 않는다.
    // - 음.. 2번(modules를 useMemo로 고정시키는 것)이 낫겠지?
    () => ({
      syntax: {
        highlight: highlight,
        interval: 0,
      },
      toolbar: false,
    }),
    []
  );

  // Quill을 설정해주는 작업
  useEffect(() => {
    // - useEffect를 안 써줘도 되지만, 그러면 프롭스로 들어온 post 값이 바뀔 때마다 이 코드가 실행됨.
    // - useEffect로 감싸주면 최초 렌더링 시에 한 번만 실행됨.
    // - 어차피 readOnly니까 렌더링이 두 번에서 한 번으로 줄어드는 거라.. 유의미한 차이는 없겠지만..
    // - editor mode에서는 post 값이 계속 바뀔 테니까 감싸주는 게 좋을 것 같다.

    // 에디터의 사용 가능 폰트 설정
    const Font = Quill.import("formats/font");
    // - 라이브러리에서 Font 객체를 가져온다.

    Font.whitelist = [
      // - 사용 가능 폰트 목록(whitelist) 재설정
      false,
      // "굴림",
      "ibmPlexMono",
      "sans-serif",
      "serif",
      "monospace",
    ];

    Quill.register(Font, true);
    // - Quill에 등록(사용 가능 폰트 목록 변경)
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
  }, []);

  return (
    <ReactQuill
      // className={className}
      className="quillPost"
      value={value}
      onChange={handleChangeQuillViewer}
      modules={modules}
      theme={"snow"}
      readOnly
    />
  );
};

export default QuillViewer;
