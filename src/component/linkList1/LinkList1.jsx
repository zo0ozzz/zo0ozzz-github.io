import { Link } from "react-router-dom";
import "./LinkList1.scss";

export default function ({ data }) {
  const linkList1 = data.map(({ name, URL }, index) => (
    <span className="linkList1">
      <Link to={URL}>
        <li>{name}</li>
      </Link>
    </span>
  ));

  return <>{linkList1}</>;
}
