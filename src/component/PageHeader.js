import "./PageHeader.scss";
import { Link } from "react-router-dom";

export function PageHeader() {
  const pageHeaderData = {
    pageName: "zo0ozzz",
    pageNav: [
      ["nav1", "#"],
      ["nav2", "#"],
      ["nav3", "#"],
    ],
  };
  const { pageName, pageNav } = pageHeaderData;

  const pageNavList = pageNav.map(([navName, navLink], index) => {
    return (
      <>
        <Link to={navLink} className="link" key={index}>
          <li>{navName}</li>
        </Link>
      </>
    );
  });

  return (
    <>
      <header className="page-header">
        <Link to="#" className="link">
          <p className="page-header-name">{pageName}</p>
        </Link>
        <div />
        <nav className="page-header-nav">
          <ul>{pageNavList}</ul>
        </nav>
      </header>
    </>
  );
}
