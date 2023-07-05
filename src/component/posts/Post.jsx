import "./Post.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HTMLRenderer } from "../common/HTMLRenderer";

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [mode, setMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9999/data/" + id)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, []);

  return (
    <>
      <div className="posts">
        <div className="bar">
          {mode ? (
            <button
              className="editButton"
              onClick={() => {
                setMode(false);
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
            <textarea class="textarea">{post.body}</textarea>
          ) : (
            <HTMLRenderer content={post.body} />
          )}
        </div>
      </div>
    </>
  );
}
