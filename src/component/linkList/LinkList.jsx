import { Link } from "react-router-dom";
import "./LinkList.scss";

export default function LinkList({ data }) {
  // data = { name: "", URL: "", className: "" };

  const linkList = data.map(
    ({ name = "견본", URL = "#", className_li = "" }, index) => (
      <Link className="linkList-Link" to={URL} key={index}>
        <li className={`linkList-li ${className_li}`}>{name}</li>
      </Link>
    )
  );

  return (
    <div className="linkList">
      <ul className="linkList-ul">{linkList}</ul>
    </div>
  );
}
