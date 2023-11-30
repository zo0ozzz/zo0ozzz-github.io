import "./Header.scss";
import { useEffect, useState } from "react";
import api from "../../lib/axios/axios";
import { Link } from "react-router-dom";
import { Nav } from "../nav/Nav";

export default function PageHeader({ isGod, setIsGod, isGodPage }) {
  const [blogName, setBlogName] = useState("");

  // mount function
  const getBlogName = async () => {
    try {
      const response = await api.get("/god/blogName");
      const status = response.status;
      const data = response.data;

      const blogName = data.blogName;

      if (status === 200) {
        setBlogName((prev) => blogName);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    getBlogName();
  }, [isGodPage]);

  return (
    <header className="header">
      <div className="header__blogName">
        {isGodPage ? (
          // - 현재 관리자 페이지에 있으면 true, 아니면 false
          //  - 관리자 페이지에서 블로그 이름을 수정해야 하는데,
          //  - 헤더가 계속 떠 있어서 수정된 이름을 즉각 반영하는 게 곤란했음.
          //  - 그래서 관리자 페이지에서는 header의 blogName 부분을 다른 요소로 교체함.
          <Link to="/" className="link blogName__link">
            <p className="blogName__name">관리자 페이지(클릭하면 홈으로)</p>
          </Link>
        ) : (
          <Link to="/" className="link blogName__link">
            <p className="blogName__name">{blogName}</p>
          </Link>
        )}
      </div>
      <div className="flexEmpty" />
      <div className="header__nav">
        <Nav isGod={isGod} setIsGod={setIsGod} />
      </div>
    </header>
  );
}
