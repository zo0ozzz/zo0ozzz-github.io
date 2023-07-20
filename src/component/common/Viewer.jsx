import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./Viewer.scss";

export default function QuillViewer({ content }) {
  return (
    <ReactQuill
      className="Viewer"
      value={content}
      readOnly={true}
      theme={"bubble"}
    />
  );
}
