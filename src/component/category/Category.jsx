import { useEffect, useState } from "react";
import "./Category.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../lib/axios/axios";

export default function ({ categories, categoriesAndPostsCount }) {
  const [prevCategories, setPrevCategories] = useState("");

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

  async function updateCategories() {
    try {
      const response = await api.patch("/post/updateCategories", categories);
      const status = response.status;

      console.log(status);

      console.log("카테고리 업데이트: ", status === 200 ? "성공" : "실패");
    } catch (error) {
      console.log(error);
    }
  }

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
        {category}({categoriesAndPostsCount[category]})
      </li>
    );
  });

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    function isSameArray(arr1, arr2) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    if (isSameArray(categories, prevCategories)) {
      return;
    }

    updateCategories();
  }, [categories, prevCategories]);

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
