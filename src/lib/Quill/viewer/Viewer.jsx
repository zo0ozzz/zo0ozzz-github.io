import ReactQuill from "react-quill";
import { viewerModulesConfig } from "../config.js";
import "react-quill/dist/quill.snow.css";
import "../common.scss";
import "./Viewer.scss";

export default function QuillViewer({ content }) {
  return (
    <>
      <div className="wrapper-Viewer">
        <ReactQuill
          value={content}
          modules={viewerModulesConfig}
          theme={"snow"}
          readOnly={true}
        />
      </div>
    </>
  );
}
