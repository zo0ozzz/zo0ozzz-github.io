import "./BlogNameEditor.scss";
import { useState, useRef, useEffect } from "react";
import api from "../../lib/axios/axios";
import Label2 from "../label2/Label2";
import InputText2 from "../inputText2/InputText2";
import Button2 from "../button2/Button2";

export default function () {
  const [blogName, setBlogName] = useState({ prev: "", current: "" });
  const blogNameTextInputId = "blogNameTextInput";
  const blogNameTextInputRef = useRef(null);

  // * mount function
  const getBlogName = async () => {
    const response = await api.get("/god/blogName");
    const status = response.status;
    const data = response.data;

    const blogName = data.blogName;

    if (status === 200) {
      setBlogName((prev) => ({ ...prev, prev: blogName, current: blogName }));

      return;
    } else {
      console.log(status);

      return;
    }
  };

  // useEffect

  useEffect(() => {
    getBlogName();
  }, []);

  // handler function
  const handleChangeBlogNameTextInput = (e) => {
    const newBlogName = e.target.value;

    setBlogName((prev) => ({ ...prev, current: newBlogName }));
  };

  const handleClickSubmitButton = async () => {
    try {
      const response = await api.patch("/god/blogName", {
        blogName: blogName.current,
      });
      const status = response.status;

      if (status === 200) {
        alert(`블로그 이름이 <${blogName.current}>으로 변경되었습니다.`);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.error(error.status);
    }
  };

  const handleClickCancleButton = () => {
    setBlogName((prev) => ({ ...prev, current: blogName.prev }));
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
                value={blogName.current}
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
}
