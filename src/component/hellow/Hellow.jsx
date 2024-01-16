import "./Hellow.scss";
import { useState, useEffect } from "react";
import api from "../../lib/axios/axios";
import QuillViewer from "../../lib/Quill/QuillViewer";

export const Hellow = () => {
  const [hellowMessage, setHellowMessage] = useState("");

  // mount function
  const getHellowMessage = async () => {
    try {
      const response = await api.get("/god/hellowMessage");
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const hellowMessage = data.hellowMessage;

        setHellowMessage(hellowMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect
  useEffect(() => {
    getHellowMessage();
  }, []);

  // handler funtion
  const handleChangeHellowMessage = (newHellowMessage) =>
    setHellowMessage((prev) => newHellowMessage);

  return (
    <section className="hellow">
      <QuillViewer value={hellowMessage} onChange={handleChangeHellowMessage} />
    </section>
  );
};

export default Hellow;
