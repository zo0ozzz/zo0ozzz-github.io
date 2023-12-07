import "./PostViewer.scss";
import { useState, useEffect, useRef } from "react";
import api from "../../lib/axios/axios.js";
import { POST_API } from "../../URL";
import OtherPosts from "../otherPosts/OtherPosts.jsx";
import PostToolBar from "../postToolBar/PostToolBar.jsx";
import PostTitle from "../postTitle/PostTitle.jsx";
import PostCategoryBar from "../postCategoryBar/PostCategoryBar.jsx";
import QuillViewer from "../../lib/Quill/QuillViewer.jsx";

export default function PostViewer({ mode, _id, setCategoryData, isGod }) {
  const [posts, setPosts] = useState({
    prev: {},
    current: {},
    next: {},
  });
  const post = posts.current;

  // mount function
  const getPosts = async (_id) => {
    try {
      const response = await api.get("/post/test/" + _id);
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const newPosts = data.posts;

        setPosts((prev) => ({ ...prev, ...newPosts }));
      } else {
        console.log(status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect
  useEffect(() => {
    getPosts(_id);
  }, [_id]);

  // handler function
  const handleChangPostContent = (newPostContent) =>
    setPosts((prev) => ({
      ...prev,
      current: { ...prev.current, content: newPostContent },
    }));

  return (
    <>
      <div className="postViewer">
        <div className="postViewer__otherPosts--top">
          <OtherPosts posts={posts} />
        </div>
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
        <div className="postViewer__otherPosts--bottom">
          <OtherPosts posts={posts} />
        </div>
      </div>
    </>
  );
}
