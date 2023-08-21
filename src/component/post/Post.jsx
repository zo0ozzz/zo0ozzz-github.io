import "./Post.scss";
import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  redirect,
} from "react-router-dom";
import api from "../../lib/axios/axios.js";
// editor
import Editor from "../../lib/Quill/editor/Editor.jsx";
// viewer
import Viewer from "../../lib/Quill/viewer/Viewer";

export default function Post() {
  const { _id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const editorRef = useRef();

  // handler function
  function goEdit() {
    navigate("/edit/" + _id);
  }

  async function deletePost() {
    const answer = prompt("게시물을 삭제하시겠습니까?");

    if (answer === null) {
      return;
    }

    try {
      const response = await api.delete("/post/" + _id);
      const status = response.status;
      console.log(status);

      if (status === 200) {
        alert("삭제 완료");

        navigate("/");
      } else {
        console.log(status);
      }
    } catch (error) {
      alert("삭제 실패(통신 오류)");

      console.log(error);
    }
  }

  function setPostContent(newContent) {
    return (prev) => ({ ...prev, content: newContent });
  }

  // useEffect function
  const getPost = async () => {
    try {
      const response = await api.get("/post/" + _id);
      // const isOk = response.statusText;
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPost(post);
      } else {
        console.log("get, /post:id 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="posts">
        <div className="bar">
          <button className="editButton" onClick={goEdit}>
            수정
          </button>
          <button className="deleteButton" onClick={deletePost}>
            삭제
          </button>
        </div>

        <div className="title">{post.title}</div>
        <div className="content">
          <Editor
            postContent={post.content}
            setPostContent={setPostContent}
            isViewer={true}
            ref={editorRef}
          />
        </div>
      </div>
    </>
  );
}
