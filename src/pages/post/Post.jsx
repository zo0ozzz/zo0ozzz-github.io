import "./Post.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import PostViewer from "../../component/postViewer/PostViewer";
import PostEditor from "../../component/postEditor/PostEditor";

export default function Post({
  mode,
  categories,
  setCategoriesAndPostsCount,
  categoryData,
  setCategoryData,
}) {
  const { _id } = useParams();

  return (
    <>
      <div className="post">
        {mode ? (
          <PostEditor
            _id={_id}
            mode={mode}
            categories={categories}
            setCategoriesAndPostsCount={setCategoriesAndPostsCount}
            categoryData={categoryData}
            setCategoryData={setCategoryData}
          />
        ) : (
          <PostViewer _id={_id} setCategoryData={setCategoryData} />
        )}
      </div>
    </>
  );
}
