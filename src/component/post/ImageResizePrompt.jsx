import "./PostEditor.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";
import { Quill } from "react-quill";

export default function ImageResizePrompt({
  editorRef,
  imageResize,
  setImageResize,
  // imageResizeRef,
}) {
  const imageResizeRef = useRef({
    prompt: null,
    input: null,
    submitButton: null,
    cancelButton: null,
    button1: null,
    button2: null,
  });

  const handleKeyDownImageReizeInput = (e) => {
    if (e.key === "Enter") {
      imageResizeRef.current.submitButton.click();

      return;
    }

    if (e.key === "Escape") {
      imageResizeRef.current.cancelButton.click();

      return;
    }
  };

  const handleChangeImageResizeInput = (e) => {
    const target = e.target;
    const value = target.value;
    setImageResize((prev) => ({ ...prev, inputValue: value }));
  };

  useEffect(() => {
    if (imageResize.isPrompt === true) {
      imageResizeRef.current.input.focus();
      imageResizeRef.current.input.select();
    }
  }, [imageResize.isPrompt]);

  return (
    <>
      <div
        ref={(dom) => (imageResizeRef.current.prompt = dom)}
        className="imageResizePrompt"
        style={{ top: `${imageResize.position.top}px` }}
      >
        <div className="wrapper-imageResizeInputAndSubmitButton">
          <span>변경할 너비(px):</span>
          <input
            ref={(dom) => (imageResizeRef.current.input = dom)}
            type="text"
            className="imageResizeInput"
            value={imageResize.inputValue}
            onChange={handleChangeImageResizeInput}
            onKeyDown={handleKeyDownImageReizeInput}
          />
          <input
            ref={(dom) => (imageResizeRef.current.submitButton = dom)}
            type="button"
            value="변경"
            className="imageResizeSubmitButton"
            onClick={() => {
              const quillInstance = editorRef.current.getEditor();
              quillInstance.deleteText(imageResize.range);
              quillInstance.insertEmbed(
                imageResize.range.index,
                "image",
                { src: imageResize.src, size: imageResize.inputValue + "px" },
                Quill.sources.USER
              );

              setImageResize((prev) => ({ ...prev, isPrompt: false }));
            }}
          />
          <input
            ref={(dom) => (imageResizeRef.current.cancelButton = dom)}
            type="button"
            value="취소"
            className="cancleButton"
            onClick={() => {
              setImageResize((prev) => ({ ...prev, isPrompt: false }));
            }}
          />
        </div>
        <span className="divider">|</span>
        <div className="wrapper-imageResizeButtons">
          <input
            ref={(dom) => (imageResizeRef.current.button1 = dom)}
            type="button"
            value="300"
            onClick={() => {
              const quillInstance = editorRef.current.getEditor();
              quillInstance.deleteText(imageResize.range);
              quillInstance.insertEmbed(
                imageResize.range.index,
                "image",
                { src: imageResize.src, size: 300 + "px" },
                Quill.sources.USER
              );
              setImageResize((prev) => ({ ...prev, isPrompt: false }));
            }}
          />
          <input
            ref={(dom) => (imageResizeRef.current.button2 = dom)}
            type="button"
            value="500"
            onClick={() => {
              const quillInstance = editorRef.current.getEditor();
              quillInstance.deleteText(imageResize.range);
              quillInstance.insertEmbed(
                imageResize.range.index,
                "image",
                { src: imageResize.src, size: 500 + "px" },
                Quill.sources.USER
              );

              setImageResize((prev) => ({ ...prev, isPrompt: false }));
            }}
          />
        </div>
      </div>
    </>
  );
}
