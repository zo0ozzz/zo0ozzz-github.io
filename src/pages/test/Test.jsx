import "./Test.scss";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Quill } from "react-quill";
import QuillViewer from "../../lib/Quill/QuillViewer";
import QuillEditor from "../../lib/Quill/QuillEditor";
import Button2 from "../../component/button2/Button2";
import ImageResizePrompt from "../../component/imageResizePrompt/ImageResizePrompt";

export default function Test() {
  const buttonRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <>
      <div className="test">
        <div className="test__messageBox">
          <p className="messageBox__message">{"<테스트 페이지>"}</p>
        </div>

        <button
          onClick={(e) => {
            console.log(e.clientX);
          }}
          ref={buttonRef}
        >
          test
        </button>
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation();
              buttonRef.current.click();
            }
          }}
        />
      </div>
    </>
  );
}
