import "./Modal.scss";
import { useState } from "react";
import QuillMemo from "../../lib/Quill/QuillMemo";

const Modal = () => {
  const [content, setContent] = useState("");
  console.log(content);

  const handleChangeQuillMemo = (newContent) =>
    setContent((prev) => newContent);
  // const handleInputDiv = (e) => {
  //   setContent((prev) => e.target.value);
  // };
  return (
    <div className="memo">
      <div className="memo__topBar">x</div>
      <div className="memo__content">
        <QuillMemo value={content} onChange={handleChangeQuillMemo} />
      </div>
    </div>
  );
};

export default Modal;
