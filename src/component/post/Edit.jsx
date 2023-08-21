import "./Edit.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
// quill editor
import Editor from "../../lib/Quill/editor/Editor.jsx";

export default function Edit() {
  const { _id } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const editorRef = useRef();
  const navigate = useNavigate();

  function editPostTitle(e) {
    const value = e.target.value;

    setPostTitle(value);
  }

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
            onClick={async () => {
              try {
                const editedPost = {
                  title: postTitle,
                  content: postContent,
                };

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
            }}
          >
            등록
          </button>
        </div>
        <div className="title">
          <input type="text" value={postTitle} onChange={editPostTitle} />
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
