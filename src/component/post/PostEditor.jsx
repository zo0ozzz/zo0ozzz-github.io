import "./Post.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import Editor from "../../lib/Quill/Quill.jsx";

export default function PostEditor({ _id }) {
  const [post, setPost] = useState({ title: "", content: "" });
  console.log(post);
  const editorRef = useRef();
  const navigate = useNavigate();

  // set state func
  const setPostTitle = useCallback(
    (newPostTitle) =>
      setPost((prevPost) => ({ ...prevPost, title: newPostTitle })),
    [setPost]
  );

  const setPostContent = useCallback((newPostContent) =>
    setPost((prevPost) => ({ ...prevPost, content: newPostContent }), [setPost])
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
    getPost();
  }, []);

  return (
    <>
      <div className="posts">
        <div className="bar">
          <button
            className={"completeEditButton"}
            onClick={(e) => handleClickCompleteEditButton(e)}
          >
            등록
          </button>
        </div>
        <div className="title">
          <input
            type="text"
            value={post.title}
            onChange={handleChangePostTitleInput}
          />
        </div>
        <div className="content">
          <Editor
            postContent={post.content}
            setPostContent={setPostContent}
            ref={editorRef}
          />
        </div>
      </div>
    </>
  );
}
