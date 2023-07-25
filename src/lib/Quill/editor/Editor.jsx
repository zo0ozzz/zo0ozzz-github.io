import ReactQuill from "react-quill";
import { editorModulesConfig } from "../config.js";
import "react-quill/dist/quill.snow.css";
import "../common.scss";
import "./Editor.scss";
import { useState, useRef, forwardRef } from "react";

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

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    onChange(content);

    console.log("셀렉션 때도 반응함!");
  };

  const handleChangeSelection = (range, source, editor) => {
    // console.log("range: ", range, "source: ", range, "editor: ", editor);
    // const selection = editor.getSelection();
    // console.log(selection);
    // console.log(ref.current.editor.editor.delta.ops[selection.index].insert);
    // console.log(editor);
  };

  return (
    <>
      <div className="wrapper-Editor">
        <ReactQuill
          value={value}
          onChange={handleChange}
          modules={editorModulesConfig}
          theme={"snow"}
          onChangeSelection={handleChangeSelection}
          ref={ref}
        />
      </div>
    </>
  );
});

export default Editor;
