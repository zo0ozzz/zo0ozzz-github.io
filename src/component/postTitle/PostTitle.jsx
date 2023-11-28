import "./PostTitle.scss";
import InputText2 from "../inputText2/InputText2";

const PostTitle = ({ mode, postTitle, setPostTitle, editorRef }) => {
  // handler function
  function handleChangePostTitleInput(e) {
    const newPostTitle = e.target.value;

    setPostTitle(newPostTitle);
  }

  function handleKeyDownPostTitleInput(e) {
    if (e.keyCode === 9) {
      e.preventDefault();

      const quillInstance = editorRef.current.getEditor();
      const index = 0;
      quillInstance.setSelection(index);
    }
  }

  return (
    <div className="postTitle">
      {mode === "view" ? (
        <p className="postTitle__title">{postTitle}</p>
      ) : (
        <InputText2
          value={postTitle}
          onChange={handleChangePostTitleInput}
          onKeyDown={handleKeyDownPostTitleInput}
          className="postTitle__titleInput"
        />
      )}
    </div>
  );
};

export default PostTitle;
