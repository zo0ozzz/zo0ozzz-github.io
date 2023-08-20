import "./Edit.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
// quill editor
import Editor from "../../lib/Quill/editor/Editor.jsx";

export default function Edit() {
  console.log(2);
  const { _id } = useParams();
  // const postTitle = useRef("");
  // const postContent = useRef("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  function editPostTitle(e) {
    const value = e.target.value;

    setPostTitle(value);
  }

  function editPostContent(newContent) {
    setPostContent((prev) => newContent);
  }

  async function getPost() {
    console.log(1);
    try {
      const response = await api.get("/post/" + _id);
      const status = response.status;
      const post = response.data;

      console.log(post);

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
        {console.log(3)}
        <div className="bar">
          <button
            onClick={async () => {
              try {
                const editedPost = {
                  postTitle: postTitle.current,
                  postContent: postContent.current,
                };

                const response = await api.post("/post", editedPost);
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
          <input type="text" value={postTitle} onChange={editPostTitle} />
        </div>
        <div className="content">
          <Editor
            ref={editorRef}
            value={postContent}
            onChange={editPostContent}
          />
        </div>
      </div>
    </>
  );
}
