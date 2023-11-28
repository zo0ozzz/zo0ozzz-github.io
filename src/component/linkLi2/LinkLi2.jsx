import "./LinkLi2.scss";
import { Link } from "react-router-dom";

export default function LinkLi2({ className, url, name, key }) {
  return (
    <Link className="link" to={url} key={key}>
      <li className={`linkLi2 li ${className}`}>{name}</li>
    </Link>
  );
}
