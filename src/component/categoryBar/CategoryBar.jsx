import "./CategoryBar.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../lib/axios/axios";
import LinkList from "../linkList/LinkList";

export default function ({ categoryData, setCategoryData }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentCategory =
    currentPath === "/"
      ? categoryData[0].name
      : decodeURIComponent(currentPath.replace("/categories/", ""));

  console.log("categoryData: ", categoryData);

  // const [prevCategoryData, setPrevCategoryData] = useState({});

  // async function updateCategoryData() {
  //   try {
  //     const response = await api.patch(
  //       "/post/updateCategoryData",
  //       categoryData
  //     );
  //     const status = response.status;
  //     const data = response.data;

  //     if (status === 200) {
  //       setPrevCategoryData(categoryData);
  //       setCategoryData(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // function isSameArray(arr1, arr2) {
  //   if (isLengthSame(arr1, arr2) && isElementSame(arr1, arr2)) {
  //     return true;
  //   }

  //   return false;

  //   function isLengthSame(arr1, arr2) {
  //     if (arr1.length !== arr2.length) {
  //       return false;
  //     }

  //     return true;
  //   }

  //   function isElementSame(arr1, arr2) {
  //     for (let i = 0; i < arr1.length; i++) {
  //       if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
  //         return false;
  //       }

  //       return true;
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (isSameArray(categoryData, prevCategoryData)) {
  //     return;
  //   }

  //   updateCategoryData();
  // }, [categoryData]);

  const getCategoryData = async () => {
    try {
      const response = await api.get("/god/categoryData");
      const status = response.status;
      const data = response.data;

      if (status === 200) {
        const categoryData = data.categoryData;

        setCategoryData(categoryData);
      } else {
        console.log(status);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const categoryListData = categoryData.map(({ name, postCount }, index) => {
    return {
      name: `${name}(${postCount})`,
      URL: `/categories/${name}`,
      className_li: name === currentCategory ? "active" : "",
    };
  });

  return (
    <div className="categoryList">
      <ul>
        <LinkList data={categoryListData} />
      </ul>
    </div>
  );
}
