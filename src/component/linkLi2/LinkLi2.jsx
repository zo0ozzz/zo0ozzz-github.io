import "./LinkLi2.scss";
import { Link } from "react-router-dom";

export default function LinkLi2({ className_Link, className, url, name, key }) {
  return (
    <Link className={`link ${className_Link}`} to={url} key={key}>
      <li className={`linkLi2 li ${className}`}>{name}</li>
    </Link>
  );
}
