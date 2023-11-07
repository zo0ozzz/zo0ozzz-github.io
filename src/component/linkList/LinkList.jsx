import { Link } from "react-router-dom";
import "./LinkList.scss";

export default function LinkList({ data }) {
  const linkList = data.map(({ name, URL }, index) => (
    <Link className="linkList-Link" to={URL} key={index}>
      <li className="linkList-li">{name}</li>
    </Link>
  ));

  return (
    <div className="linkList">
      <ul className="linkList-ul">{linkList}</ul>
    </div>
  );
}
