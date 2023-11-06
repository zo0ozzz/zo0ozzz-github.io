import { Link } from "react-router-dom";
import "./LinkList2.scss";

export default function ({ data }) {
  const linkList2 = data.map(({ name, URL }, index) => (
    <Link to={URL}>
      <li>{name}</li>
    </Link>
  ));

  return (
    <>
      <ul className="linkList2">{linkList2}</ul>
    </>
  );
}
