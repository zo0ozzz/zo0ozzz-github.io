// import "./Post.scss";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
// quill editor
import Editor from "../../lib/Quill/Quill.jsx";

export default function PostCreator() {
  const [post, setPost] = useState({ title: "", content: "" });
  const editorRef = useRef();
  const navigate = useNavigate();

  const setPostTitle = useCallback(
    (newPostTitle) =>
      setPost((prevPost) => ({ ...prevPost, title: newPostTitle })),
    []
  );

  const setPostContent = useCallback(
    (newPostContent) =>
      setPost((prevPost) => ({ ...prevPost, content: newPostContent })),
    []
  );

  async function handleClickCompleteCreateButton() {
    try {
      const newPost = post;

      const response = await api.post("/post", newPost);
      const status = response.status;
      const _id = response.data._id;

      if (status === 200) {
        navigate("/posts/" + _id);
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

  return (
    <>
      <div className="posts">
        <div className="bar">
          <button
            className={"completeCreateButton"}
            onClick={handleClickCompleteCreateButton}
          >
            등록
          </button>
        </div>
        <div className="title">
          <input type="text" onChange={(e) => handleChangePostTitleInput(e)} />
        </div>
        <div className="content">
          <Editor
            postContent={post.content}
            setPostContent={setPostContent}
            // ref={editorRef}
          />
        </div>
      </div>
    </>
  );
}
