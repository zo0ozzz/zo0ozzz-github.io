import "./Post.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
// editor
import Editor from "../../lib/Quill/editor/Editor.jsx";
// viewer
import Viewer from "../../lib/Quill/viewer/Viewer";

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [mode, setMode] = useState(false);

  const editPostContent = (content) =>
    setPost((prev) => ({ ...prev, body: content }));

  useEffect(() => {
    fetch("http://localhost:9999/data/" + id)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, [mode]);

  return (
    <>
      <div className="posts">
        <div className="bar">
          {mode ? (
            <button
              className="editButton"
              onClick={() => {
                const bodyValue = post.body;

                const data = {
                  body: bodyValue,
                };

                fetch("http://localhost:9999/data/" + id, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                  .then((response) => {
                    console.log("status: ", response.status);
                    setMode(false);
                  })
                  .catch((error) => {
                    console.log("error: ", error);
                  });
              }}
            >
              확인
            </button>
          ) : (
            <button
              className="editButton"
              onClick={() => {
                setMode(true);
              }}
            >
              수정
            </button>
          )}
        </div>
        <div className="subject">{post.title}</div>
        <div className="content">
          {mode ? (
            <>
              <Editor initialValue={post.body} onChange={editPostContent} />
            </>
          ) : (
            <>
              <Viewer content={post.body} />
              {/* <HTMLRenderer content={post.body} /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
