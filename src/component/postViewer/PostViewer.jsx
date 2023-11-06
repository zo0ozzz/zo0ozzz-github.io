import "./PostViewer.scss";
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";

export default function PostViewer({ _id, setCategoriesAndPostsCount }) {
  const [post, setPost] = useState({ title: "", content: "" });
  // const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const viewerRef = useRef(null);

  const setPostContent = useCallback((newPostContent) => {
    setPost((prevPost) => {
      console.log("setPostContent 재생성");

      return { ...prevPost, content: newPostContent };
    });
  }, []);

  // handler function
  function handleClickEditPostButton() {
    navigate("/edit/" + _id);
  }

  async function handleClickDeletePostButton() {
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
      <div className="wrapper-PostViewer">
        <div className="bar">
          <button
            className="editPostButton"
            onClick={handleClickEditPostButton}
          >
            수정
          </button>
          <button
            className="deletePostButton"
            onClick={handleClickDeletePostButton}
          >
            삭제
          </button>
        </div>
        <div className="title">
          <div className="titleContent">{post.title}</div>
        </div>
        {post.category === "미분류" ? null : (
          <div className="category">분류: {post.category}</div>
        )}

        <div className="content">
          <QuillEditor
            postContent={post.content}
            setPostContent={setPostContent}
            isViewer={true}
            ref={viewerRef}
          />
        </div>
      </div>
    </>
  );
}
