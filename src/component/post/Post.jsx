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
          <button
            className="editButton"
            onClick={() => {
              navigate("/edit/" + _id);
            }}
          >
            수정
          </button>
        </div>

        <div className="title">{post.title}</div>
        <div className="content">
          <Viewer content={post.content} />
        </div>
      </div>
    </>
  );
}
