import { useEffect } from "react";
import "./Hellow.scss";

export default function Hellow() {
  const hellowData = {
    content: ["안녕하세요", "zo0ozzz의 블로그입니다.", "오늘도 좋은 날입니다."],
  };

  const content = hellowData.content.map((item, index) => {
    return (
      <p className="hellow-p" key={index}>
        {item}
      </p>
    );
  });

  useEffect(() => {
    console.log("hellow");
  }, []);

  return (
    <>
      <section className="hellow">{content}</section>
    </>
  );
}
