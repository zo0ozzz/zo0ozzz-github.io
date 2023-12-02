import "./Test.scss";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Quill } from "react-quill";
import QuillViewer from "../../lib/Quill/QuillViewer";
import QuillEditor from "../../lib/Quill/QuillEditor";
import Button2 from "../../component/button2/Button2";
import ImageResizePrompt from "../../component/imageResizePrompt/ImageResizePrompt";

export default function Test() {
  const [mode, setMode] = useState("view");
  const [post, setPost] = useState({ content: "" });
  console.log(post);
  const editorRef = useRef(null);

  const [imageResize, setImageResize] = useState({
    isPrompt: false,
    src: "",
    range: { index: 0, length: 0 },
    inputValue: "",
    position: { top: 0 },
  });

  useEffect(() => {
    if (mode === "view") setPost((prev) => ({ ...prev, content: "view" }));

    if (mode === "edit") setPost((prev) => ({ ...prev, content: "edit" }));

    if (mode === "create") setPost((prev) => ({ ...prev, content: "create" }));
  }, [mode]);

  useEffect(() => {
    if (mode === "view") return;

    const quillInstance = editorRef.current.getEditor();
    const editorBody = editorRef.current.getEditor().root;

    editorBody.addEventListener("click", (e) => {
      const target = e.target;

      if (target.tagName !== "IMG") {
        setImageResize((prev) => ({ ...prev, isPrompt: false }));

        return;
      }

      if (target.tagName === "IMG") {
        const findedByDOM = Quill.find(target, false);
        const index = quillInstance.getIndex(findedByDOM);
        const range = { index: index, length: 1 };
        const imageBound = target.getBoundingClientRect();
        const src = target.src;

        setImageResize((prev) => ({
          range: range,
          src: src,
          position: { top: imageBound.bottom + window.scrollY + 10 },
          inputValue: imageBound.width,
        }));

        setTimeout(() => {
          setImageResize((prev) => ({ ...prev, isPrompt: true }));
        }, 0);
      }
    });
  }, []);

  return (
    <>
      <div className="test">
        <div className="test__messageBox">
          <p className="messageBox__message">{"<테스트 페이지>"}</p>
        </div>
        <div className="buttons">
          <Button2 name="view" onClick={() => setMode((prev) => "view")} />
          <Button2 name="edit" onClick={() => setMode((prev) => "edit")} />
          <Button2 name="create" onClick={() => setMode((prev) => "create")} />
        </div>
        <div>
          {mode === "view" ? (
            <QuillViewer post={post} setPost={setPost} />
          ) : (
            <>
              <QuillEditor post={post} setPost={setPost} ref={editorRef} />
              {imageResize.isPrompt ? (
                <ImageResizePrompt
                  editorRef={editorRef}
                  imageResize={imageResize}
                  setImageResize={setImageResize}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
}
