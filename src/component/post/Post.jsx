import "./Post.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import PostViewer from "./PostViewer";
import PostEditor from "./PostEditor";

export default function Post({ mode }) {
  const { _id } = useParams();

  return (
    <>
      <div className="post">
        {mode ? <PostEditor _id={_id} mode={mode} /> : <PostViewer _id={_id} />}
      </div>
    </>
  );
}

// async function patchPost() {
//   try {
//     const editedPost = {
//       title: postTitle,
//       content: postContent,
//     };

//     const response = await api.patch("/post/" + _id, editedPost);
//     const status = response.status;

//     if (status === 200) {
//       goPost(_id);
//     } else {
//       console.log("status: ", status);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function postPost() {
//   try {
//     const newPost = {
//       title: postTitle.current,
//       content: postContent,
//     };

//     const response = await api.post("/post", newPost);
//     const status = response.status;
//     const _id = response.data._id;

//     if (status === 200) {
//       goPost(_id);
//     } else {
//       console.log("status: ", status);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function goPost(_id) {
//   navigate("/posts/" + _id);
// }
