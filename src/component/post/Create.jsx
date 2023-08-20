import "./Create.scss";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
// quill editor
import Editor from "../../lib/Quill/editor/Editor.jsx";

export default function Create() {
  const postTitle = useRef("");
  const postContent = useRef("");
  const editorRef = useRef(null);
  const navigate = useNavigate();

  function editPostTitle(e) {
    const value = e.target.value;

    postTitle.current = value;
  }

  function editPostContent(newContent) {
    postContent.current = newContent;
  }

  return (
    <>
      <div className="posts">
        <div className="bar">
          <button
            onClick={async () => {
              try {
                const newPost = {
                  postTitle: postTitle.current,
                  postContent: postContent.current,
                };

                console.log(newPost);

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
            ref={editorRef}
            initialValue={postContent}
            onChange={editPostContent}
          />
        </div>
      </div>
    </>
  );
}
