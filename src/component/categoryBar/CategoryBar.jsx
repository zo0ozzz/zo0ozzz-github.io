import "./CategoryBar.scss";
import { useLocation } from "react-router-dom";
import LinkLi2 from "../linkLi2/LinkLi2";

const CategoryBar = ({ categoryData, representativeCategoryName }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory =
    currentPath === "/"
      ? representativeCategoryName
      : decodeURIComponent(currentPath.replace("/categories/", ""));

  const categoryList = categoryData.map((item, index) => (
    <LinkLi2
      className={`categoryList__item ${
        item.name === currentCategory ? "categoryList__item--active" : ""
      }`}
      name={`${item.name}(${item.postCount})`}
      url={`/categories/${item.name}`}
      key={index}
    />
  ));

  return (
    <div className="categoryBar">
      <div className="categoryBar__categoryList">
        <ul className="categoryList">{categoryList}</ul>
      </div>
    </div>
  );
};

export default CategoryBar;
