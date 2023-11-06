import "./Header.scss";
import { Link } from "react-router-dom";
import { Nav } from "../nav/Nav";

export default function PageHeader() {
  const blogNameData = { name: "zo0ozzz", URL: "/" };

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
