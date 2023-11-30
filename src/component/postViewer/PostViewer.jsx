import "./PostViewer.scss";
import { useState, useEffect, useRef } from "react";
import api from "../../lib/axios/axios.js";
import { POST_API } from "../../URL";
import PostToolBar from "../postToolBar/PostToolBar.jsx";
import PostTitle from "../postTitle/PostTitle.jsx";
import PostCategoryBar from "../postCategoryBar/PostCategoryBar.jsx";
import QuillViewer from "../../lib/Quill/QuillViewer.jsx";

export default function PostViewer({ mode, _id, setCategoryData, isGod }) {
  const [post, setPost] = useState({ title: "", content: "", category: "" });
  // const viewerRef = useRef(null);

  // mount function
  async function getPost() {
    try {
      const response = await api.get(POST_API(_id));
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPost((prev) => ({
          ...prev,
          title: post.title,
          content: post.content,
          category: post.category,
        }));
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect
  useEffect(() => {
    getPost();
  }, []);

  // handler function
  const handleChangPostContent = (newPostContent) =>
    setPost((prev) => ({ ...prev, content: newPostContent }));

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
          <PostTitle mode={mode} postTitle={post.title} post={post} />
        </div>
        <div className="postViewer__postCategoryBar">
          <PostCategoryBar
            mode={mode}
            postCategory={post.category}
            post={post}
          />
        </div>
        <div className="postViewer__viewer">
          <QuillViewer value={post.content} onChange={handleChangPostContent} />
        </div>
      </div>
    </>
  );
}
