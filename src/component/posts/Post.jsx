import "./Post.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HTMLRenderer } from "../common/HTMLRenderer";
// ckEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [mode, setMode] = useState(false);
  const postBodyData = useRef(post.body);

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
                const bodyValue = postBodyData.current;
                // const bodyValue = textarea.current.value.replace(/\t/g, "");

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
              <h2>Using CKEditor 5 build in React</h2>
              <CKEditor
                editor={ClassicEditor}
                data={post.body}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  postBodyData.current = editor.getData();
                  // console.log({ event, editor });
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </>
          ) : (
            // <textarea
            //   class="textarea"
            //   ref={textarea}
            //   defaultValue={post.body}
            //   rows={10}
            //   onChange={() => {
            //     textarea.current.style.height = "auto";
            //     textarea.current.style.height =
            //       textarea.current.scrollHeight + "px";
            //   }}
            // />
            <HTMLRenderer content={post.body} />
          )}
        </div>
      </div>
    </>
  );
}
