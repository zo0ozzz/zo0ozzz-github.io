import "./BlogNameEditor.scss";
import { useState, useRef, useEffect } from "react";
import api from "../../lib/axios/axios";
import Label2 from "../label2/Label2";
import InputText2 from "../inputText2/InputText2";
import Button2 from "../button2/Button2";

const BlogNameEditor = ({ blogName, setBlogName }) => {
  const [newBlogName, setNewBlogName] = useState("");
  const blogNameTextInputId = "blogNameTextInput";
  const blogNameTextInputRef = useRef(null);

  useEffect(() => {
    if (blogName === "") return;

    setNewBlogName((prev) => blogName);
  }, [blogName]);

  // handler function
  const handleChangeBlogNameTextInput = (e) => {
    const blogNameTextInputValue = e.target.value;

    setNewBlogName((prev) => blogNameTextInputValue);
  };

  const handleClickSubmitButton = async () => {
    try {
      const response = await api.patch("/god/blogName", {
        blogName: newBlogName,
      });
      const status = response.status;

      if (status === 200) {
        setBlogName((prev) => newBlogName);

        alert(`블로그 이름이 <${newBlogName}>으로 변경되었습니다.`);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.error(error.status);
    }
  };

  const handleClickCancleButton = () => {
    setNewBlogName((prev) => blogName);
  };

  return (
    <>
      <div className="blogNameEditor">
        <div className="blogNameEditor__inner">
          <Label2 name="블로그 이름:" htmlFor={blogNameTextInputId} />
          <div className="blogNameEditor__renamingBox">
            <div className="renamingBox__blogNameTextInput">
              <InputText2
                className="renamingBox__blogNameTextInput"
                value={newBlogName}
                onChange={handleChangeBlogNameTextInput}
                id={blogNameTextInputId}
                ref={blogNameTextInputRef}
              />
            </div>
            <div className="renamingBox__buttons">
              <Button2
                className="renamingBox__cancleButton"
                name="취소"
                onClick={handleClickCancleButton}
              />
              <Button2
                className="renamingBox__submitButton"
                name="확인"
                onClick={handleClickSubmitButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogNameEditor;
