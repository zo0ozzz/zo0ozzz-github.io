import "./Post.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
// quill editor
import Editor from "../../lib/Quill/editor/Editor.jsx";

export default function Create() {
  const postTitle = useRef("");
  const [postContent, setPostContent] = useState();
  const editorRef = useRef();
  const navigate = useNavigate();

  function editPostTitle(e) {
    const inputValue = e.target.value;

    postTitle.current = inputValue;
  }

  return (
    <>
      <div className="posts">
        <div className="bar">
          <button
            onClick={async () => {
              try {
                const newPost = {
                  title: postTitle.current,
                  content: postContent,
                };

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
            }}
          >
            등록
          </button>
        </div>
        <div className="title">
          <input type="text" onChange={editPostTitle} />
        </div>
        <div className="content">
          <Editor
            postContent={postContent}
            setPostContent={setPostContent}
            ref={editorRef}
          />
        </div>
      </div>
    </>
  );
}
