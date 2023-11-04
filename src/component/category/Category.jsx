import { useEffect, useState } from "react";
import "./Category.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ({ categories }) {
  const firstCategory = "전체";
  const lastCategory = "미분류";

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory =
    currentPath === "/"
      ? firstCategory
      : decodeURIComponent(currentPath.replace("/categories/", ""));
  // 모든 카테고리 항목을 클릭하면 카테고리 페이지가 아니라 홈으로 이동하게 해놨음.
  const [activeCategory, setActiveCategory] = useState(firstCategory);

  const categoryList = categories.map((category, index) => {
    const isActive = category === activeCategory;

    return (
      <li
        className={isActive ? "active" : ""}
        key={index}
        onClick={() => {
          setActiveCategory(category);
          navigate("/categories/" + category);
        }}
      >
        {category}(0)
      </li>
    );
  });

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  return (
    <div className="categoryList">
      <ul>
        <li
          className={firstCategory === activeCategory ? "active" : ""}
          onClick={() => {
            setActiveCategory(firstCategory);
            navigate("/categories/전체");
          }}
        >
          {firstCategory}(0)
        </li>
        {categoryList}
        <li
          className={lastCategory === activeCategory ? "active" : ""}
          onClick={() => {
            setActiveCategory(lastCategory);
            navigate("/categories/미분류");
          }}
        >
          {lastCategory}(0)
        </li>
      </ul>
    </div>
  );
}
