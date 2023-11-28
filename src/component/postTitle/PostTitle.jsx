import "./PostTitle.scss";
import InputText2 from "../inputText2/InputText2";

const PostTitle = ({ mode, title, setPostTitle, editorRef }) => {
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
        <p className="postTitle__title">{title}</p>
      ) : (
        <InputText2
          value={title}
          onChange={handleChangePostTitleInput}
          onKeyDown={handleKeyDownPostTitleInput}
        />
      )}
    </div>
  );
};

export default PostTitle;
