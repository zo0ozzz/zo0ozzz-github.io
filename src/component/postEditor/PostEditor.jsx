import "./PostEditor.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import { POST_API } from "../../URL";
import { Quill } from "react-quill";
import PostToolBar from "../postToolBar/PostToolBar.jsx";
import PostTitle from "../postTitle/PostTitle.jsx";
import PostCategoryBar from "../postCategoryBar/PostCategoryBar.jsx";
import QuillEditor from "../../lib/Quill/QuillEditor.jsx";
import ImageResizePrompt from "../imageResizePrompt/ImageResizePrompt";

export default function PostEditor({
  mode,
  _id,
  categoryData,
  setCategoryData,
  isGod,
}) {
  const [post, setPost] = useState({ title: "", category: "", content: "" });
  const [imageResize, setImageResize] = useState({
    isPrompt: false,
    src: "",
    range: { index: 0, length: 0 },
    inputValue: "",
    position: { top: 0 },
  });
  const editorRef = useRef(null);
  const timeoutId = useRef(null);

  // mount function
  async function getPost() {
    try {
      const response = await api.get(POST_API(_id));
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPost((prevPost) => ({ ...prevPost, ...post }));
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect
  useEffect(() => {
    if (categoryData.length === 1) return;

    if (mode === "create") {
      setPost((prevPost) => ({
        ...prevPost,
        title: "",
        content: "",
        category: categoryData.find((item) => item.isNoCategory === true).name,
      }));

      return;
    }

    if (mode === "edit") getPost();
  }, [mode, categoryData]);

  useEffect(() => {
    const quillInstance = editorRef.current.getEditor();
    const editorBody = editorRef.current.getEditor().root;

    const handleClick = (e) => {
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

        if (timeoutId.current) clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(() => {
          setImageResize((prev) => ({ ...prev, isPrompt: true }));
        }, 0);
      }
    };

    editorBody.addEventListener("click", handleClick);

    return () => {
      editorBody.removeEventListener("click", handleClick);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  // handler function
  const handleChangePostContent = (newPostContent) =>
    setPost((prev) => ({ ...prev, content: newPostContent }));

  return (
    <>
      <div className="postEditor">
        <div className="postEditor__postToolBar">
          <PostToolBar
            mode={mode}
            _id={_id}
            isGod={isGod}
            post={post}
            setCategoryData={setCategoryData}
          />
        </div>
        <div className="postEditor__postTitle">
          <PostTitle
            mode={mode}
            post={post}
            setPost={setPost}
            editorRef={editorRef}
          />
        </div>
        <div className="postEditor__postCategoryBar">
          <PostCategoryBar
            mode={mode}
            post={post}
            setPost={setPost}
            categoryData={categoryData}
          />
        </div>
        <div className="postEditor__QuillEditor">
          <QuillEditor
            value={post.content}
            onChange={handleChangePostContent}
            post={post}
            setPost={setPost}
            ref={editorRef}
          />
          {imageResize.isPrompt ? (
            <ImageResizePrompt
              editorRef={editorRef}
              imageResize={imageResize}
              setImageResize={setImageResize}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
