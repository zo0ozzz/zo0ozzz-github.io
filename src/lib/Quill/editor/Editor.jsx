import ReactQuill from "react-quill";
import { editorModulesConfig } from "../config.js";
import "react-quill/dist/quill.snow.css";
import "../common.scss";
import "./Editor.scss";
import { useState } from "react";

export default function Editor({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (content) => {
    setValue(content);
    onChange(content);
  };

  return (
    <>
      <div className="wrapper-Editor">
        <ReactQuill
          value={value}
          onChange={handleChange}
          modules={editorModulesConfig}
          theme={"snow"}
        />
      </div>
    </>
  );
}
