import "./Post.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
// quill editor
import Editor from "../../lib/Quill/editor/Editor.jsx";

export default function Edit({ mode }) {
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

  async function patchPost() {
    try {
      const editedPost = {
        title: postTitle,
        content: postContent,
      };

      const response = await api.patch("/post/" + _id, editedPost);
      const status = response.status;

      if (status === 200) {
        goPost(_id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postPost() {
    try {
      const newPost = {
        title: postTitle.current,
        content: postContent,
      };

      const response = await api.post("/post", newPost);
      const status = response.status;
      const _id = response.data._id;

      if (status === 200) {
        goPost(_id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function goPost(_id) {
    navigate("/posts/" + _id);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="posts">
        <div className="bar">
          <button onClick={async () => {}}>등록</button>
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
