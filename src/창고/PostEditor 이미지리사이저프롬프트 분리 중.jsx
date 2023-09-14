import "./PostEditor.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";
import { Quill } from "react-quill";
import ImageResizePrompt from "./ImageResizePrompt";

export default function PostEditor({ _id, mode }) {
  const [post, setPost] = useState({ title: "", content: "" });
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [imageResize, setImageResize] = useState({
    isPrompt: false,
    src: "",
    range: { index: 0, length: 0 },
    inputValue: "",
    position: { top: 0 },
  });
  // const imageResizeRef = useRef({
  //   prompt: null,
  //   input: null,
  //   submitButton: null,
  //   cancelButton: null,
  //   button1: null,
  //   button2: null,
  // });

  const setPostTitle = useCallback(
    (newPostTitle) =>
      setPost((prevPost) => ({ ...prevPost, title: newPostTitle })),
    []
  );

  const setPostContent = useCallback((newPostContent) =>
    setPost((prevPost) => ({ ...prevPost, content: newPostContent }), [])
  );

  // const handleKeyDownImageReizeInput = (e) => {
  //   if (e.key === "Enter") {
  //     imageResizeRef.current.submitButton.click();

  //     return;
  //   }

  //   if (e.key === "Escape") {
  //     imageResizeRef.current.cancelButton.click();

  //     return;
  //   }
  // };

  // const handleChangeImageResizeInput = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   setImageResize((prev) => ({ ...prev, inputValue: value }));
  // };

  // const imageResizePrompt = (
  //   <>
  //     <div
  //       ref={(dom) => (imageResizeRef.current.prompt = dom)}
  //       className="imageResizePrompt"
  //       style={{ top: `${imageResize.position.top}px` }}
  //     >
  //       <div className="wrapper-imageResizeInputAndSubmitButton">
  //         <span>변경할 너비(px):</span>
  //         <input
  //           ref={(dom) => (imageResizeRef.current.input = dom)}
  //           type="text"
  //           className="imageResizeInput"
  //           value={imageResize.inputValue}
  //           onChange={handleChangeImageResizeInput}
  //           onKeyDown={handleKeyDownImageReizeInput}
  //         />
  //         <input
  //           ref={(dom) => (imageResizeRef.current.submitButton = dom)}
  //           type="button"
  //           value="변경"
  //           className="imageResizeSubmitButton"
  //           onClick={() => {
  //             const quillInstance = editorRef.current.getEditor();
  //             quillInstance.deleteText(imageResize.range);
  //             quillInstance.insertEmbed(
  //               imageResize.range.index,
  //               "image",
  //               { src: imageResize.src, size: imageResize.inputValue + "px" },
  //               Quill.sources.USER
  //             );

  //             setImageResize((prev) => ({ ...prev, isPrompt: false }));
  //           }}
  //         />
  //         <input
  //           ref={(dom) => (imageResizeRef.current.cancelButton = dom)}
  //           type="button"
  //           value="취소"
  //           className="cancleButton"
  //           onClick={() => {
  //             setImageResize((prev) => ({ ...prev, isPrompt: false }));
  //           }}
  //         />
  //       </div>
  //       <span className="divider">|</span>
  //       <div className="wrapper-imageResizeButtons">
  //         <input
  //           ref={(dom) => (imageResizeRef.current.button1 = dom)}
  //           type="button"
  //           value="300"
  //           onClick={() => {
  //             const quillInstance = editorRef.current.getEditor();
  //             quillInstance.deleteText(imageResize.range);
  //             quillInstance.insertEmbed(
  //               imageResize.range.index,
  //               "image",
  //               { src: imageResize.src, size: 300 + "px" },
  //               Quill.sources.USER
  //             );
  //             setImageResize((prev) => ({ ...prev, isPrompt: false }));
  //           }}
  //         />
  //         <input
  //           ref={(dom) => (imageResizeRef.current.button2 = dom)}
  //           type="button"
  //           value="500"
  //           onClick={() => {
  //             const quillInstance = editorRef.current.getEditor();
  //             quillInstance.deleteText(imageResize.range);
  //             quillInstance.insertEmbed(
  //               imageResize.range.index,
  //               "image",
  //               { src: imageResize.src, size: 500 + "px" },
  //               Quill.sources.USER
  //             );

  //             setImageResize((prev) => ({ ...prev, isPrompt: false }));
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </>
  // );

  // event handle func
  async function handleClickCompleteEditButton() {
    try {
      const editedPost = post;

      const response = await api.patch("/post/" + _id, editedPost);
      const status = response.status;

      if (status === 200) {
        navigate("/posts/" + _id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickCompleteCreateButton() {
    try {
      const newPost = post;

      const response = await api.post("/post", newPost);
      const status = response.status;
      const newPost_id = response.data._id;

      if (status === 200) {
        navigate("/posts/" + newPost_id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePostTitleInput(e) {
    const newPostTitle = e.target.value;

    setPostTitle(newPostTitle);
  }

  // mount func
  async function getPost() {
    try {
      const response = await api.get("/post/" + _id);
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPostTitle(post.title);
        setPostContent(post.content);
      } else {
        console.log("get, /post:id 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (mode === "create") {
      setPost((prevPost) => ({ ...prevPost, title: "", content: "" }));

      return;
    }

    if (mode === "edit") getPost();
  }, [mode]);

  useEffect(() => {
    const quillInstance = editorRef.current.getEditor();
    const editorBody = editorRef.current.getEditor().root;

    editorBody.addEventListener("click", (e) => {
      const target = e.target;

      if (target.tagName !== "IMG") {
        // setImageResize(false);
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

  // useEffect(() => {
  //   if (imageResize.isPrompt === true) {
  //     imageResizeRef.current.input.focus();
  //     imageResizeRef.current.input.select();
  //   }
  // }, [imageResize.isPrompt]);

  return (
    <>
      <div className="wrapper-postEditor">
        <div className="bar">
          {mode === "edit" ? (
            <button
              className={"completeEditButton"}
              onClick={handleClickCompleteEditButton}
            >
              수정 완료
            </button>
          ) : mode === "create" ? (
            <button
              className={"completeCreateButton"}
              onClick={handleClickCompleteCreateButton}
            >
              등록
            </button>
          ) : null}
        </div>
        <div className="title">
          <input
            type="text"
            value={post.title}
            onChange={(e) => handleChangePostTitleInput(e)}
          />
        </div>
        <div className="content">
          <QuillEditor
            postContent={post.content}
            setPostContent={setPostContent}
            ref={editorRef}
          />
          {imageResize.isPrompt ? (
            <ImageResizePrompt
              editorRef={editorRef}
              imageResize={imageResize}
              setImageResize={setImageResize}
              // imageResizeRef={imageResizeRef.current}
            />
          ) : null}
          {/* {imageResize.isPrompt ? imageResizePrompt : null} */}
        </div>
      </div>
    </>
  );
}
