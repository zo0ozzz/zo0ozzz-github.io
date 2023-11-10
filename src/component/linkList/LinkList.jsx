import { Link } from "react-router-dom";
import "./LinkList.scss";

export default function LinkList({ data }) {
  const { name = "", URL = "", className_Link = "", className_li = "" } = data;

  const linkList = data.map(
    ({ name = "견본", URL = "#", className_li = "" }, index) => (
      <Link
        className={`link linkList-Link ${className_Link}`}
        to={URL}
        key={index}
      >
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
