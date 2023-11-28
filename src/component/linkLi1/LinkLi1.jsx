import "./LinkLi1.scss";
import { Link } from "react-router-dom";

export default function LinkLi1({ data }) {
  const { className = "", url = "#", name = "" } = data;

  return (
    <Link className="link" to={url}>
      <li className={`linkLi1 li ${className}`}>{name}</li>
    </Link>
  );
}
