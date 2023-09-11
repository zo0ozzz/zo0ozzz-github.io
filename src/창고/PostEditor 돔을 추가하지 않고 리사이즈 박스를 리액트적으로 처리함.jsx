import "./PostCommon.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import QuillEditor from "../../lib/Quill/Quill.jsx";
import { Quill } from "react-quill";

export default function PostEditor({ _id, mode }) {
  const [post, setPost] = useState({ title: "", content: "" });
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [isHTML, setIsHTML] = useState(false);
  const [isImageSrc, setImageSrc] = useState("");
  const [imageRange, setImageRange] = useState({});
  const [sizeInputValue, setSizeInputValue] = useState("");
  const [location, setLocation] = useState({ x: "", y: "" });
  console.log(location);

  const setPostTitle = useCallback(
    (newPostTitle) =>
      setPost((prevPost) => ({ ...prevPost, title: newPostTitle })),
    []
  );

  const setPostContent = useCallback((newPostContent) =>
    setPost((prevPost) => ({ ...prevPost, content: newPostContent }), [])
  );

  const html = (
    <>
      <div
        className="imageResizePrompt"
        style={{ left: `${location.x}px`, top: `${location.y}px` }}
      >
        <input
          type="text"
          placeholder="신사답게 입력해"
          id="sizeInput"
          value={sizeInputValue}
          onChange={(e) => {
            const target = e.target;
            const value = target.value;
            setSizeInputValue(value);
          }}
        />
        <input
          type="button"
          value="변경"
          id="button1"
          onClick={(e) => {
            const quillInstance = editorRef.current.getEditor();
            quillInstance.deleteText(imageRange);
            quillInstance.insertEmbed(
              imageRange.index,
              "image",
              { src: isImageSrc, size: sizeInputValue + "px" },
              Quill.sources.USER
            );
            quillInstance.setSelection(
              imageRange.index + 1,
              Quill.sources.SILENT
            );

            setIsHTML(false);
          }}
        />
        <input type="button" value="300" id="button2" />
        <input type="button" value="500" id="button3" />
      </div>
    </>
  );

  // event handle func
  async function handleClickCompleteEditButton() {
    try {
      const editedPost = post;

      const response = await api.patch("/post/" + _id, editedPost);
      const status = response.status;

      if (status === 200) {
        navigate("/posts/" + _id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickCompleteCreateButton() {
    try {
      const newPost = post;

      const response = await api.post("/post", newPost);
      const status = response.status;
      const newPost_id = response.data._id;

      if (status === 200) {
        navigate("/posts/" + newPost_id);
      } else {
        console.log("status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePostTitleInput(e) {
    const newPostTitle = e.target.value;

    setPostTitle(newPostTitle);
  }

  // mount func
  async function getPost() {
    try {
      const response = await api.get("/post/" + _id);
      const status = response.status;
      const post = response.data;

      if (status === 200) {
        setPostTitle(post.title);
        setPostContent(post.content);
      } else {
        console.log("get, /post:id 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (mode === "create") {
      setPost((prevPost) => ({ ...prevPost, title: "", content: "" }));

      return;
    }

    if (mode === "edit") getPost();
  }, [mode]);

  // useEffect(() => {
  //   const quillInstance = editorRef.current.getEditor();
  //   const editorBody = editorRef.current.getEditor().root;
  //   // const editorBody = document.querySelector(".ql-editor");
  //   // 1. 이미지가 클릭되면 해당 이미지가 셀렉션 되게
  //   // 2. 사이즈 조정 박스가 보이게

  //   editorBody.addEventListener("click", (e) => {
  //     const target = e.target;

  //     const imageResizePrompt = document.querySelector(".imageResizePrompt");
  //     if (imageResizePrompt) {
  //       imageResizePrompt.remove();
  //     }

  //     if (target.tagName !== "IMG") return;

  //     if (target.tagName === "IMG") {
  //       const div = document.createElement("div");
  //       div.style.border = "1px solid";
  //       div.style.padding = "2px";
  //       div.classList.add("imageResizePrompt");

  //       const input = document.createElement("input");
  //       input.setAttribute("type", "text");
  //       input.setAttribute("placeholder", "신사답게 입력해.");
  //       input.id = "sizeInput";

  //       const button1 = document.createElement("input");
  //       button1.setAttribute("type", "button");
  //       button1.setAttribute("value", "변경");
  //       button1.id = "button1";

  //       const button2 = document.createElement("input");
  //       button2.setAttribute("type", "button");
  //       button2.setAttribute("value", "300");
  //       button2.id = "button2";

  //       const button3 = document.createElement("input");
  //       button3.setAttribute("type", "button");
  //       button3.setAttribute("value", "500");
  //       button3.id = "button3";

  //       div.insertAdjacentElement("beforeend", input);
  //       div.insertAdjacentElement("beforeend", button1);
  //       div.insertAdjacentElement("beforeend", button2);
  //       div.insertAdjacentElement("beforeend", button3);

  //       quillInstance.addContainer(div);

  //       // const x = e.clientX;
  //       // const y = e.clientY;
  //       const findedByDOM = Quill.find(target, false);
  //       const index = quillInstance.getIndex(findedByDOM);
  //       const range = { index: index, length: 1 };

  //       const imageResizePrompt = document.querySelector(".imageResizePrompt");
  //       const sizeInput = document.querySelector("#sizeInput");
  //       const submitButton = document.querySelector("#button1");

  //       const position = quillInstance.getBounds(index, 1);
  //       imageResizePrompt.style.top = position.bottom + 10 + "px";
  //       // imageResizePrompt.style.top = x + "px";
  //       // imageResizePrompt.style.left = y + "px";

  //       submitButton.addEventListener("click", () => {
  //         const inputValue = sizeInput.value + "px";
  //         const src = target.src;

  //         quillInstance.deleteText(range);
  //         quillInstance.insertEmbed(
  //           range.index,
  //           "image",
  //           { src: src, size: inputValue },
  //           Quill.sources.USER
  //         );
  //         quillInstance.setSelection(range.index + 1, Quill.sources.SILENT);

  //         imageResizePrompt.remove();
  //       });

  //       sizeInput.focus();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const quillInstance = editorRef.current.getEditor();
    const editorBody = editorRef.current.getEditor().root;
    // const editorBody = document.querySelector(".ql-editor");
    //   // 1. 이미지가 클릭되면 해당 이미지가 셀렉션 되게
    //   // 2. 사이즈 조정 박스가 보이게

    editorBody.addEventListener("click", (e) => {
      const target = e.target;

      if (target.tagName !== "IMG") {
        setIsHTML(false);

        return;
      }

      if (target.tagName === "IMG") {
        const findedByDOM = Quill.find(target, false);
        const index = quillInstance.getIndex(findedByDOM);
        const src = target.src;
        const range = { index: index, length: 1 };
        const x = e.clientX;
        const y = e.clientY;

        setImageSrc(src);
        setImageRange(range);
        setIsHTML(true);
        setLocation({ x: x, y: y });
      }
    });
  }, []);

  return (
    <>
      <div className="wrapper-postEditor">
        <div className="bar">
          {mode === "edit" ? (
            <button
              className={"completeEditButton"}
              onClick={handleClickCompleteEditButton}
            >
              수정 완료
            </button>
          ) : mode === "create" ? (
            <button
              className={"completeCreateButton"}
              onClick={handleClickCompleteCreateButton}
            >
              등록
            </button>
          ) : null}
        </div>
        <div className="title">
          <input
            type="text"
            value={post.title}
            onChange={(e) => handleChangePostTitleInput(e)}
          />
        </div>
        <div className="content">
          <QuillEditor
            postContent={post.content}
            setPostContent={setPostContent}
            ref={editorRef}
          />
          {isHTML ? html : null}
        </div>
      </div>
    </>
  );
}
