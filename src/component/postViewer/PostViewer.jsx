import "./PostViewer.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";
import { POST_API, POST_EDIT_PAGE } from "../../URL";
import PostToolBar from "../postToolBar/PostToolBar.jsx";
import PostTitle from "../postTitle/PostTitle.jsx";
import PostCategoryBar from "../postCategoryBar/PostCategoryBar.jsx";

export default function PostViewer({ _id, setCategoryData, mode, isGod }) {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "", category: "" });
  const viewerRef = useRef(null);

  // mount function
  async function handleClickDeletePostButton() {
    const answer = prompt("게시물을 삭제하시겠습니까?");

    if (answer === null) {
      return;
    }

    try {
      const response = await api.delete(POST_API(_id));
      const status = response.status;

      if (status === 200) {
        alert("삭제 완료");
        navigate("/");

        return;
      } else {
        console.log(status);

        return;
      }
    } catch (error) {
      alert("삭제 실패(통신 오류)");

      console.log(error);
    }
  }

  async function getPost() {
    try {
      const response = await api.get(POST_API(_id));
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPost((prev) => ({ ...prev, post }));
      } else {
        console.log("get, /post:id 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handler function
  const setPostContent = (newPostContent) =>
    setPost((prevPost) => ({ ...prevPost, content: newPostContent }));

  function handleClickEditPostButton() {
    navigate(POST_EDIT_PAGE(_id));
  }

  // useEffect
  useEffect(() => {
    getPost();
  }, []);

  const postViewerData = {
    value: post.content,
    onChange: setPostContent,
    readOnly: true,
  };

  return (
    <>
      <div className="postViewer">
        <div className="postViewer__postToolbar">
          <PostToolBar
            mode={mode}
            _id={_id}
            setCategoryData={setCategoryData}
            isGod={isGod}
          />
        </div>
        <div className="postViewer__postTitle">
          <PostTitle mode={mode} postTitle={post.title} />
        </div>
        <div className="postViewer__postCategoryBar">
          <PostCategoryBar postCategory={post.category} mode={mode} />
        </div>
        <div className="postViewer__viewer">
          <QuillEditor data={postViewerData} ref={viewerRef} />
        </div>
      </div>
    </>
  );
}
