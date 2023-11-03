import { useEffect, useState } from "react";
import "./Category.scss";
import { Link, useNavigate } from "react-router-dom";

export default function ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const navigate = useNavigate();
  const [isActive1, setisActive1] = useState(false);

  // const categoryClass = isActive ? "active" : null;

  const categoryList = categories.map((category, index) => {
    const [isActive2, setisActive2] = useState(false);

    return (
      <li
        className={isActive2 ? "active" : null}
        key={index}
        onClick={() => {
          setisActive2(true);
          navigate("/categories/" + category);
        }}
      >
        {category}(0)
      </li>
    );
  });

  useEffect(() => {}, []);

  return (
    <div className="categoryList">
      <ul>
        <li
          className="category"
          onClick={() => {
            navigate("/");
          }}
        >
          전체(0)
        </li>
        {categoryList}
      </ul>
    </div>
  );
}
