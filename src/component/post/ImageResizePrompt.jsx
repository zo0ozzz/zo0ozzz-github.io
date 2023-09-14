import "./PostEditor.scss";
import { useRef, useEffect } from "react";
import { Quill } from "react-quill";

export default function ImageResizePrompt({
  editorRef,
  imageResize,
  setImageResize,
}) {
  const inputLabelMessage = "변경할 너비(px):";
  const inputPlaceholder = "예) 318";
  const submitButtonValue = "변경";
  const cancelButtonValue = "취소";
  const presetWidth = [300, 500];
  const imageResizeRef = useRef({
    prompt: null,
    input: null,
    submitButton: null,
    cancelButton: null,
    button1: null,
    button2: null,
  });

  // handler
  const handleChangeImageResizeInput = (e) => {
    const target = e.target;
    const value = target.value;
    setImageResize((prev) => ({ ...prev, inputValue: value }));
  };

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

  const handleClickSubmitAndPresetButton = (width) => {
    const quillInstance = editorRef.current.getEditor();
    quillInstance.deleteText(imageResize.range);
    quillInstance.insertEmbed(
      imageResize.range.index,
      "image",
      { src: imageResize.src, size: width + "px" },
      Quill.sources.USER
    );

    setImageResize((prev) => ({ ...prev, isPrompt: false }));
  };

  useEffect(() => {
    if (imageResize.isPrompt === true) {
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
          <label htmlFor="sizeInput">{inputLabelMessage}</label>
          <input
            ref={(dom) => (imageResizeRef.current.input = dom)}
            type="text"
            id="sizeInput"
            placeholder={inputPlaceholder}
            className="imageResizeInput"
            value={imageResize.inputValue}
            onChange={handleChangeImageResizeInput}
            onKeyDown={handleKeyDownImageReizeInput}
          />
          <input
            ref={(dom) => (imageResizeRef.current.submitButton = dom)}
            type="button"
            value={submitButtonValue}
            className="imageResizeSubmitButton"
            onClick={() =>
              handleClickSubmitAndPresetButton(imageResize.inputValue)
            }
          />
          <input
            ref={(dom) => (imageResizeRef.current.cancelButton = dom)}
            type="button"
            value={cancelButtonValue}
            className="cancleButton"
            onClick={() => {
              setImageResize((prev) => ({ ...prev, isPrompt: false }));
            }}
          />
        </div>
        <span className="divider">|</span>
        <div className="wrapper-imageResizeButtons">
          {presetWidth.map((width, index) => (
            <input
              key={index}
              ref={(dom) =>
                (imageResizeRef.current[`button${index + 1}`] = dom)
              }
              type="button"
              value={width}
              onClick={() => handleClickSubmitAndPresetButton(width)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
