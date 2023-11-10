import "./PostEditor.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";
import { Quill } from "react-quill";
import ImageResizePrompt from "../imageResizePrompt/ImageResizePrompt";
import Select1 from "../select1/Select1";
import Label1 from "../label/Label1";
import Button1 from "../button1/Button1";
import InputText1 from "../inputText1/InputText1";
import { POST_API } from "../../URL";

export default function PostEditor({
  _id,
  mode,
  categoryData,
  setCategoryData,
  allAndNoCategoryData,
}) {
  const [post, setPost] = useState({ title: "", category: "", content: "" });
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [imageResize, setImageResize] = useState({
    isPrompt: false,
    src: "",
    range: { index: 0, length: 0 },
    inputValue: "",
    position: { top: 0 },
  });

  function setPostTitle(newPostTitle) {
    setPost((prevPost) => ({ ...prevPost, title: newPostTitle }));
  }

  function setPostCategory(newPostCategory) {
    setPost((prevPost) => ({ ...prevPost, category: newPostCategory }));
  }

  function setPostContent(newPostContent) {
    setPost((prevPost) => ({ ...prevPost, content: newPostContent }));
  }

  // mount func
  async function getPost() {
    try {
      const response = await api.get(POST_API(_id));
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPost((prevPost) => ({ ...prevPost, ...post }));
      } else {
        console.log("get, /post:id 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickCompleteEditButton() {
    try {
      const editedPost = post;

      const response = await api.patch(POST_API(_id), editedPost);
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        setCategoryData(data);
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

      const response = await api.post(POST_API(""), newPost);
      const status = response.status;
      const data = response.data;
      const newPost_id = data._id;
      const newCategoryData = data.categoryData;

      if (status === 200) {
        setCategoryData(newCategoryData);
        navigate("/posts/" + newPost_id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangePostTitleInput(e) {
    const newPostTitle = e.target.value;

    setPostTitle(newPostTitle);
  }

  function handleKeyDownPostTitleInput(e) {
    if (e.keyCode === 9) {
      e.preventDefault();

      const quillInstance = editorRef.current.getEditor();
      const index = 0;
      quillInstance.setSelection(index);
    }
  }

  const handleChangeCategory = (e) => {
    const newCategory = e.target.value;
    setPostCategory(newCategory);
  };

  useEffect(() => {
    if (mode === "create") {
      setPost((prevPost) => ({
        ...prevPost,
        title: "",
        content: "",
        category: allAndNoCategoryData.no,
      }));

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

  const completeEditButtonData = {
    name: "수정 완료",
    onClick: handleClickCompleteEditButton,
    className: "completeEditButton",
  };

  const completeCreateButtonData = {
    name: "등록",
    onClick: handleClickCompleteCreateButton,
    className: "completeCreateButton",
  };

  const categorySelectId = "categorySelect";
  const categorySelectLabelData = {
    name: "카테고리:",
    htmlFor: categorySelectId,
  };

  const categorySelectOptionData = categoryData.reduce((acc, { name }) => {
    if (name === allAndNoCategoryData.all) {
      return acc;
    } else {
      acc.push({ value: name, name: name });

      return acc;
    }
  }, []);

  const categorySelectData = {
    value: post.category,
    onChange: handleChangeCategory,
    id: categorySelectId,
    option: categorySelectOptionData,
  };

  const postTitleInputData = {
    value: post.title,
    onChange: handleChangePostTitleInput,
    onKeyDown: handleKeyDownPostTitleInput,
  };

  return (
    <>
      <div className="postEditor">
        <div className="postEditor-bar">
          {mode === "edit" ? (
            <Button1 data={completeEditButtonData} />
          ) : mode === "create" ? (
            <Button1 data={completeCreateButtonData} />
          ) : null}
        </div>
        <div className="postEditor-title">
          <InputText1 data={postTitleInputData} />
        </div>
        <div className="postEditor-categorySelector">
          <Label1 data={categorySelectLabelData} />
          <Select1 data={categorySelectData} />
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
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
