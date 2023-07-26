import ReactQuill from "react-quill";
import { editorModulesConfig } from "../config.js";
import "react-quill/dist/quill.snow.css";
import "../common.scss";
import "./Editor.scss";
import { useState, useRef, forwardRef, useEffect } from "react";

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

const Editor = forwardRef(({ initialValue, onChange }, ref) => {
  const [value, setValue] = useState(initialValue);
  const [selection, setSelection] = useState(null);
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    onChange(content);

    console.log("내용 변경 감지");
  };

  const handleChangeSelection = (range, source, editor) => {
    setSelection(range);
  };

  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();

      if (e.target.tagName === "IMG") {
        // const button = document.createElement("button");

        // button.append("300");

        const button = document.createElement("button");
        button.classList.add("버튼");

        e.target.insertAdjacentElement("afterend", button);
        // ref.current.editor.root.append(box);

        // const answer = prompt("사이즈를 입력하세요.");

        // if (answer === "300") {
        //   e.target.classList.remove("삼백", "오백");
        //   e.target.classList.add("삼백");
        // } else if (answer === "500") {
        //   e.target.classList.remove("삼백", "오백");
        //   e.target.classList.add("오백");
        // } else {
        //   console.log("없는 입력");
        // }
      }

      console.log("콘솔: ", e.target);
    };

    ref.current.editor.root.addEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="wrapper-Editor">
        <div className="buttons">
          <button className="버튼">300</button>
          <button className="버튼">500</button>
          <button className="버튼">원래</button>
        </div>
        <ReactQuill
          value={value}
          onChange={handleChange}
          modules={editorModulesConfig}
          theme={"snow"}
          onChangeSelection={handleChangeSelection}
          ref={ref}
          // onClick={onClick}
        />
      </div>
    </>
  );
});

export default Editor;
