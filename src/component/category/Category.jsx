import "./Category.scss";
import { Link } from "react-router-dom";

export default function ({ categories }) {
  return (
    <div className="category">
      <ul>
        분류:{" "}
        {categories.map((item, index) => {
          return (
            <Link to="#" className="link" id="index">
              <li onClick={() => {}}>{item}(0)</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
