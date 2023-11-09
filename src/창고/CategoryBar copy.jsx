import { useEffect, useState } from "react";
import "./CategoryBar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../lib/axios/axios";

export default function ({
  categories,
  categoriesAndPostsCount,
  setCategoriesAndPostsCount,
  categoryData,
}) {
  // const categoryData = [
  //   { name: "전체", postCount: "-" },
  //   { name: "블로그", postCount: "-" },
  //   { name: "기타", postCount: "-" },
  //   { name: "뿅뿅뿅", postCount: "-" },
  //   { name: "미분류", postCount: "-" },
  // ];

  const [prevCategories, setPrevCategories] = useState("");

  const firstCategory = "전체";

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
      const response = await api.patch("/post/updateCategories", categoryData);
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        setCategoriesAndPostsCount(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  let allPostCount = 0;

  const categoryList = categories.map((category, index) => {
    const isActive = category === activeCategory;
    const categoryPostsCount = categoriesAndPostsCount[category];
    allPostCount += categoryPostsCount;

    return (
      <li
        className={isActive ? "active" : ""}
        key={index}
        onClick={() => {
          setActiveCategory(category);
          navigate("/categories/" + category);
        }}
      >
        {category}({categoryPostsCount})
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
          {firstCategory}({allPostCount})
        </li>
        {categoryList}
      </ul>
    </div>
  );
}
