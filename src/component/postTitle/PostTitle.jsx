import "./PostTitle.scss";
import InputText2 from "../inputText2/InputText2";
import { useRef } from "react";

const PostTitle = ({ mode, post, setPost, editorRef }) => {
  const postTitleTextInputRef = useRef(null);

  // handler function
  const handleChangePostTitleInput = (e) => {
    const newTitle = e.target.value;

    setPost((prev) => ({ ...prev, title: newTitle }));
  };

  const handleKeyDownPostTitleInput = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();

      const quillInstance = editorRef.current.getEditor();
      const index = 0;
      quillInstance.setSelection(index);
    }
  };

  return (
    <div className="postTitle">
      {mode === "view" ? (
        <p className="postTitle__title">{post.title}</p>
      ) : (
        <InputText2
          className="postTitle__titleInput"
          value={post.title}
          onChange={handleChangePostTitleInput}
          onKeyDown={handleKeyDownPostTitleInput}
          ref={postTitleTextInputRef}
        />
      )}
    </div>
  );
};

export default PostTitle;
