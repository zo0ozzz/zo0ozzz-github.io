import "./PostCommon.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";
import { Quill } from "react-quill";

export default function PostEditor({ _id, mode }) {
  const [post, setPost] = useState({ title: "", content: "" });
  const editorRef = useRef(null);
  const navigate = useNavigate();

  // set state func
  const setPostTitle = useCallback(
    (newPostTitle) =>
      setPost((prevPost) => ({ ...prevPost, title: newPostTitle })),
    []
  );

  const setPostContent = useCallback((newPostContent) =>
    setPost((prevPost) => ({ ...prevPost, content: newPostContent }), [])
  );

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
    console.log(editorBody);
    // const editorBody = document.querySelector(".ql-editor");
    // 1. 이미지가 클릭되면 해당 이미지가 셀렉션 되게
    // 2. 사이즈 조정 박스가 보이게
    editorBody.addEventListener("click", (e) => {
      const target = e.target;

      if (target.tagName !== "IMG") return;
      if (target.tagName === "IMG") {
        const findedByDOM = Quill.find(target, false);
        const elementIndex = quillInstance.getIndex(findedByDOM);
        quillInstance.setSelection(elementIndex, 1);

        const imageResizePrompt = document.querySelector(".imageResizePrompt");
        const position = quillInstance.getBounds(elementIndex, 1);
        imageResizePrompt.style.top = position.bottom + 10 + "px";
        imageResizePrompt.classList.toggle("hidden");
      }

      const submitButton = document.querySelector("#button1");
      submitButton.addEventListener("click", () => {
        const inputValue = input.value;
        const range = { index: elementIndex, length: 1 };
        // handleClickImageResizerFreeButton(inputValue, range);
        imageResizePrompt.classList.add("hidden");
      });

      const input = document.querySelector(
        ".imageResizePrompt > input[type='text']"
      );

      input.focus();
    });
  }, []);

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
        </div>
      </div>
    </>
  );
}
