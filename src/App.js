import "./App.scss";
import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import {
  HOME_PAGE,
  CATEGORY_PAGE,
  SEARCH_PAGE,
  POST_VIEW_PAGE,
  POST_EDIT_PAGE,
  POST_CREATE_PAGE,
  GOD_PAGE,
} from "./URL";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import Category from "./pages/category/Category";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import God from "./pages/god/God";

function App() {
  const sortingMedthodData = [
    {
      value: "최신순",
      name: "최신순",
      sortingFunc: (posts) => [...posts].sort((a, b) => b.number - a.number),
    },
    {
      value: "오래된 순",
      name: "오래된 순",
      sortingFunc: (posts) => [...posts].sort((a, b) => a.number - b.number),
    },
  ];

  const [selectedSortingMedthod, setSelectedSortingMedthod] = useState(
    sortingMedthodData[0].value
  );

  const allAndNoCategoryData = { all: "전체", no: "미분류" };

  const [categoryData, setCategoryData] = useState([
    { name: allAndNoCategoryData.all, postCount: "-" },
    { name: "블로그", postCount: "-" },
    { name: "기타", postCount: "-" },
    { name: "뿅뿅뿅", postCount: "-" },
    { name: allAndNoCategoryData.no, postCount: "-" },
  ]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route
            path={HOME_PAGE}
            element={
              <>
                <Home
                  sortingMedthodData={sortingMedthodData}
                  selectedSortingMedthod={selectedSortingMedthod}
                  setSelectedSortingMedthod={setSelectedSortingMedthod}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={CATEGORY_PAGE(":selectedCategory")}
            element={
              <>
                <Category
                  selectedSortingMedthod={selectedSortingMedthod}
                  setSelectedSortingMedthod={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={SEARCH_PAGE}
            element={
              <>
                <Search
                  selectedSortingMedthod={selectedSortingMedthod}
                  setSelectedSortingMedthod={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={POST_VIEW_PAGE(":_id")}
            element={
              <>
                <Post
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={POST_EDIT_PAGE(":_id")}
            element={
              <>
                <Post
                  mode={"edit"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  allAndNoCategoryData={allAndNoCategoryData}
                />
              </>
            }
          />
          <Route
            path={POST_CREATE_PAGE}
            element={
              <>
                <Post
                  mode={"create"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  allAndNoCategoryData={allAndNoCategoryData}
                />
              </>
            }
          />
          <Route
            path={GOD_PAGE}
            element={
              <>
                <God />
              </>
            }
          />
        </Routes>
        <div className="empty"></div>
        <Footer />
      </div>
    </>
  );
}

export default App;
