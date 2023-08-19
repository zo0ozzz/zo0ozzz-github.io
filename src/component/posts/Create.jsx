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

export function Post() {
  const { _id } = useParams();
  const [postContent, setPostContent] = useState("");
  // 게시물 번호
  const [post, setPost] = useState({});
  // 게시물 데이터
  const editorRef = useRef(null);
  // 편집기 dom 요소 선택
  const navigate = useNavigate();

  const editPostSubject = (newTitle) => {
    setPost((prev) => ({ ...prev, title: newTitle }));
  };

  const editPostContent = (newContent) =>
    setPost((prev) => ({ ...prev, content: newContent }));

  const getPost = async () => {
    if (mode === "create") {
      setPost((prev) => ({ ...prev, _id: _id }));

      return;
    }

    try {
      const response = await api.get("/posts/" + _id);

      if (response.status !== 200) {
        const errorMessage = response.data.errorMessage;

        alert(errorMessage);
      } else {
        const post = await response.data;

        setPost(post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [mode]);

  return (
    <>
      <div className="posts">
        <div className="bar">
          {
            {
              posts: (
                <button
                  className="editButton"
                  onClick={() => {
                    setMode("update");
                    // navigate("/update/" + _id);
                    // redirect("/");
                  }}
                >
                  수정
                </button>
              ),
              update: (
                <button
                  className="editButton"
                  onClick={async () => {
                    try {
                      const response = await api.patch("/posts", post);

                      if (response.status === 200) {
                        console.log(response.status);
                        setMode("posts");
                        // navigate("/posts/" + _id);
                      }
                    } catch (error) {
                      alert("게시물 수정 실패");

                      console.log(error);
                    }
                  }}
                >
                  확인
                </button>
              ),
              create: (
                <button
                  onClick={async () => {
                    console.log("post", post);

                    const response = await api.post("/posts", post);
                    const result = await response.data;

                    if (result.message === "잘 왔음") {
                      console.log("dddd");
                      // setMode("posts");
                      navigate("/posts/" + _id);
                    }
                  }}
                >
                  등록
                </button>
              ),
            }[mode]
          }

          {/* {mode ? (
            <button
              className="editButton"
              onClick={async () => {
                try {
                  const response = await api.patch("/posts", post);

                  if (response.status === 200) {
                    console.log(response.status);
                    setMode(!mode);
                  }
                } catch (error) {
                  alert("게시물 수정 실패");

                  console.log(error);
                }
              }}
            >
              확인
            </button>
          ) : (
            <button
              className="editButton"
              onClick={() => {
                setMode(!mode);
              }}
            >
              수정
            </button>
          )} */}
        </div>
        {
          {
            posts: (
              <>
                <div className="title">{post.title}</div>
                <div className="content">
                  <Viewer content={post.content} />
                </div>
              </>
            ),
            update: (
              <>
                <div className="title">
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;

                      setPost((prev) => ({ ...prev, title: newTitle }));
                    }}
                  />
                </div>
                <div className="content">
                  <Editor
                    ref={editorRef}
                    initialValue={post.content}
                    onChange={editPostContent}
                  />
                </div>
              </>
            ),
            create: (
              <>
                <div className="title">
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;

                      setPost((prev) => ({ ...prev, title: newTitle }));
                    }}
                  />
                </div>
                <div className="content">
                  <Editor
                    ref={editorRef}
                    initialValue={post.content}
                    onChange={editPostContent}
                  />
                </div>
              </>
            ),
          }[mode]
        }
        {/* {mode ? (
          <>
            <div className="title">
              <input
                type="text"
                value={post.title}
                onChange={(e) => {
                  const newTitle = e.target.value;

                  setPost((prev) => ({ ...prev, title: newTitle }));
                }}
              />
            </div>
            <div className="content">
              <Editor
                ref={editorRef}
                initialValue={post.content}
                onChange={editPostContent}
              />
            </div>
          </>
        ) : (
          <>
            <div className="title">{post.title}</div>
            <div className="content">
              <Viewer content={post.content} />
            </div>
          </>
        )} */}
      </div>
    </>
  );
}
