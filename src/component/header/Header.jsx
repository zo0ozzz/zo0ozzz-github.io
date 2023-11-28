import "./Header.scss";
import { useEffect } from "react";
import api from "../../lib/axios/axios";
import { Link } from "react-router-dom";
import { Nav } from "../nav/Nav";

export default function PageHeader({ blogName, setBlogName, isGod, setIsGod }) {
  const blogNameData = { name: blogName, URL: "/" };

  const getBlogName = async () => {
    try {
      const response = await api.get("/god/blogName");
      const status = response.status;
      const data = response.data;

      const blogName = data.blogName;

      if (status === 200) {
        setBlogName(blogName);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogName();
  }, []);

  return (
    <header className="header">
      <div className="header__blogName">
        <Link to={blogNameData.URL} className="link">
          <p className="blogName__name">{blogNameData.name}</p>
        </Link>
      </div>
      <div className="flexEmpty" />
      <div className="header__nav">
        <Nav isGod={isGod} setIsGod={setIsGod} />
      </div>
    </header>
  );
}
