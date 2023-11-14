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
import Test from "./pages/test/Test";

function App() {
  const [blogName, setBlogName] = useState("");
  const sortingMedthodData = [
    {
      id: 0,
      value: "최신순",
      name: "최신순",
      sortingFunc: (posts) => [...posts].sort((a, b) => b.number - a.number),
    },
    {
      id: 1,
      value: "오래된 순",
      name: "오래된 순",
      sortingFunc: (posts) => [...posts].sort((a, b) => a.number - b.number),
    },
  ];

  const [selectedSortingMedthod, setSelectedSortingMedthod] = useState(
    sortingMedthodData[0].value
  );

  // const allAndNoCategoryData = { all: "전체", no: "미분류" };

  // const [categoryData, setCategoryData] = useState([
  //   { id: 0, name: "전체", postCount: "-" },
  //   { id: 2, name: "블로그", postCount: "-" },
  //   { id: 3, name: "기타", postCount: "-" },
  //   { id: 4, name: "뿅뿅뿅", postCount: "-" },
  //   { id: 1, name: "미분류", postCount: "-" },
  // ]);

  const [categoryData, setCategoryData] = useState([]);

  // id 0: 모든 게시물(카테고리 상관없음)
  // id 1: 카테고리가 지정되지 않는 게시물(미분류)
  // - 이 두 필드의 id는 변경되면 안 됨. 추가적인 카테고리는 id 2부터 시작.

  useEffect(() => {
    // console.log("hellow");
  }, []);
  return (
    <>
      <div className="wrapper">
        <Header blogName={blogName} setBlogName={setBlogName} />
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
                />
              </>
            }
          />
          <Route
            path={GOD_PAGE}
            element={
              <>
                <God
                  blogName={blogName}
                  setBlogName={setBlogName}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={"/test"}
            element={
              <>
                <Test />
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
