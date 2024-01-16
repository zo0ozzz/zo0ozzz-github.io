import "./HellowEditor.scss";
import { useEffect, useRef, useState } from "react";
import api from "../../lib/axios/axios";
import QuillEditor from "../../lib/Quill/QuillEditor";
import Button2 from "../button2/Button2";

const HellowEditor = () => {
  const [hellowMessage, setHellowMessage] = useState({ prev: "", current: "" });
  const editorRef = useRef(null);

  // * mount function
  const getHellowMessage = async () => {
    try {
      const response = await api.get("/god/hellowMessage");
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const hellowMessage = data.hellowMessage;

        setHellowMessage((prev) => ({
          ...prev,
          prev: hellowMessage,
          current: hellowMessage,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // * useEffect
  useEffect(() => {
    getHellowMessage();
  }, []);

  // * handler function
  const handleChangeHellowMessage = (newHellowMessage) =>
    setHellowMessage((prev) => ({ ...prev, current: newHellowMessage }));

  const handleClickSubmitButton = async () => {
    try {
      const response = await api.patch("/god/hellowMessage", {
        hellowMessage: hellowMessage.current,
      });
      const status = response.status;

      if (status === 200) {
        setHellowMessage((prev) => ({ ...prev, prev: hellowMessage.current }));
        alert("헬로 메세지 최신화 성공");
      }
    } catch (error) {
      if (error.status === 500) {
        console.error(error.stack);
      }
    }
  };

  const handleClickCancleButton = () =>
    setHellowMessage((prev) => ({ ...prev, current: hellowMessage.prev }));

  return (
    <div className="hellowEditor">
      <p className="hellowEditor__label">안녕 메세지:</p>
      <div className="hellowEditor__quillEditor">
        <QuillEditor
          value={hellowMessage.current}
          onChange={handleChangeHellowMessage}
          ref={editorRef}
        />
      </div>
      <div className="hellowEditor__buttons">
        <div className="buttons">
          <Button2
            className="buttons__button"
            name="취소"
            onClick={handleClickCancleButton}
          />
          <Button2
            className="buttons__button"
            name="확인"
            onClick={handleClickSubmitButton}
          />
        </div>
      </div>
    </div>
  );
};

export default HellowEditor;
