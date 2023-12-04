import "./Test.scss";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Quill } from "react-quill";
import QuillViewer from "../../lib/Quill/QuillViewer";
import QuillEditor from "../../lib/Quill/QuillEditor";
import Button2 from "../../component/button2/Button2";
import ImageResizePrompt from "../../component/imageResizePrompt/ImageResizePrompt";

export default function Test() {
  return (
    <>
      <div className="test">
        <div className="test__messageBox">
          <p className="messageBox__message">{"<테스트 페이지>"}</p>
        </div>
        {/* <div>{createPortal(<Modal />, document.getElementById("modal"))}</div> */}
      </div>
    </>
  );
}
