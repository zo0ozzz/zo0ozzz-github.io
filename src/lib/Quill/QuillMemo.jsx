import "./QuillMemo.scss";
import { forwardRef, useCallback, useMemo, useEffect } from "react";
import ReactQuill from "react-quill";
// import hljs from "../hljs/hljs.js";
// import api from "../axios/axios.js";

const QuillMemo = forwardRef(({ value, onChange }, ref) => {
  const handleChangeValue = (newValue) => onChange(newValue);

  const modules = { toolbar: false };

  return (
    <ReactQuill
      className="quillMemo"
      value={value}
      onChange={handleChangeValue}
      modules={modules}
      ref={ref}
    />
  );
});

export default QuillMemo;
