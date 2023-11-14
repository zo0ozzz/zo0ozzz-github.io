import "./Header.scss";
import { useEffect } from "react";
import api from "../../lib/axios/axios";
import { Link } from "react-router-dom";
import { Nav } from "../nav/Nav";

export default function PageHeader({ blogName, setBlogName }) {
  const blogNameData = { name: blogName, URL: "/" };

  const getBlogName = async () => {
    const response = await api.get("/god/blogName");
    const status = response.status;
    const data = response.data;

    const blogName = data.blogName;

    if (status === 200) {
      setBlogName(blogName);
    } else {
      console.log(status);
    }
  };

  useEffect(() => {
    getBlogName();
  }, []);

  return (
    <>
      <header className="header">
        <Link to={blogNameData.URL} className="link">
          <p className="header-name">{blogNameData.name}</p>
        </Link>
        <div className="grid-div" />
        <Nav />
      </header>
    </>
  );
}
