import "./CategoryBar.scss";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../lib/axios/axios";
import LinkList from "../linkList/LinkList";

export default function ({
  categoryData,
  setCategoryData,
  representativeCategoryName,
}) {
  // const [defaultCategory, setDefaultCategory] = useState("");
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory =
    currentPath === "/"
      ? representativeCategoryName
      : decodeURIComponent(currentPath.replace("/categories/", ""));
  // const currentCategory = decodeURIComponent(
  //   currentPath.replace("/categories/", "")
  // );

  // useEffect(() => {
  //   if (categoryData.length === 1) {
  //     return;
  //   } else {
  //     setDefaultCategory(representativeCategoryName);
  //   }
  // }, [representativeCategoryName]);

  const categoryList = categoryData.map(
    ({ name, postCount, isRepresentative = false }, index) => {
      return (
        <>
          <Link to={"/categories/" + name} className="link">
            <li
              className={`categoryList__item ${
                name === currentCategory ? "categoryList__item--active" : ""
              }`}
            >
              {`${name}(${postCount})`}
            </li>
          </Link>
        </>
      );
    }
  );

  return (
    <div className="categoryBar">
      <div className="categoryBar__categoryList">
        <ul className="categoryList">{categoryList}</ul>
      </div>
    </div>
  );
}
