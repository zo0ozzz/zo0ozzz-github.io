import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (content, delta, source, editor) => {
    setValue(editor.getHTML());
    onChange(editor.getHTML());

    console.log(
      "content: ",
      content,
      "delta: ",
      delta,
      "source: ",
      source,
      "editor: ",
      editor
    );
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["code", "code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code",
    "code-block",
  ];

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
    />
  );
}
