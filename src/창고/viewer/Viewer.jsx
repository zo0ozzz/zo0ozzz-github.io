import ReactQuill from "react-quill";
// import { viewerModulesConfig } from "../../lib/Quill/editor/quillConfig.js";
import "react-quill/dist/quill.snow.css";
import "./Viewer.scss";
import { useEffect } from "react";

export default function QuillViewer({ content }) {
  return (
    <>
      <div className="wrapper-Viewer">
        <ReactQuill
          value={content}
          // modules={viewerModulesConfig}
          theme={"snow"}
          readOnly={true}
        />
      </div>
    </>
  );
}
