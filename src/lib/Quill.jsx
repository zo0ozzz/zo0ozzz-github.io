import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

export default function Quill({ initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);

  // 델타를 사용하면 안 좋다고 한다.
  // 첫 번째 매개 변수는 HTML 문자열을 받아서 성능상 이점이 있다고 함.
  // const handleChange = (content, delta, source, editor) => {
  const handleChange = (content) => {
    setValue(content);
    onChange(content);
  };

  // 툴바 순서 정하기
  const modules = {
    // toolbar 하위에 여러 key를 가지지 않는다면 객체를 넘기지 않아도 됨.
    // 하지만 여러 key를 주려면 객체를 넘겨야 함.

    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // default-value 속성을 지정한다.
        [{ font: Font.whitelist }],
        [{ size: ["small", false, "large", "huge"] }],
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
      handlers: {
        // bold: function () {
        //   console.log("폰트닥!");
        // },
      },
    },
  };

  // 툴바 기능 불러오기
  const formats = [
    "header",
    "font",
    "size",
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
      className="Editor"
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleChange}
      theme={"snow"}
    />
  );
}
