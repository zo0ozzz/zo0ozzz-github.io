import "./PageHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../urls.js";
import api from "../../lib/axios/axios.js";

export default function PageHeader() {
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
      <Link to={navLink} className="link" key={index}>
        <li>{navName}</li>
      </Link>
    );
  });

  const navigate = useNavigate();

  return (
    <>
      <header className="page-header">
        <Link to="/" className="link">
          <p className="page-header-name">{pageName}</p>
        </Link>
        <div />

        <nav className="page-header-nav">
          <div className="wrapper-createButton">
            <button
              onClick={async () => {
                try {
                  const answer = prompt("삭제할까요?");

                  if (answer !== null) {
                    const response = await api.delete("/deleteAllData");
                    const result = response.data;

                    if (response.ok) {
                      alert("데이터 삭제 완료.");
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              -
            </button>
            <button
              className="createButton"
              onClick={async () => {
                try {
                  const response = await api.get("/create");
                  const result = await response.data;

                  const _id = result._id;

                  navigate("/create/" + _id);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              +
            </button>
          </div>
          <div className="wrapper-navList">
            <ul className="navList">{pageNavList}</ul>
          </div>
        </nav>
      </header>
    </>
  );
}
