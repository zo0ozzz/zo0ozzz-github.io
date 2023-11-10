import "./App.scss";
import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import URL from "./URL";
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
      sortingFunc: sortingFunc1,
    },
    {
      value: "오래된 순",
      name: "오래된 순",
      sortingFunc: sortingFunc2,
    },
  ];
  const [selectedSortingMedthod, setSelectedSortingMedthod] = useState(
    sortingMedthodData[0].value
  );

  const [categoryData, setCategoryData] = useState([
    { name: "전체", postCount: "-" },
    { name: "블로그", postCount: "-" },
    { name: "기타", postCount: "-" },
    { name: "뿅뿅뿅", postCount: "-" },
    { name: "미분류", postCount: "-" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryData[0].name
  );

  const [categories, setCategories] = useState([
    "블로그",
    "기타",
    "뿅뿅뿅",
    "미분류",
  ]);

  // const initialCategoriesObject = categories.reduce((acc, eachCategory) => {
  //   acc[eachCategory] = "-";
  //   return acc;
  // }, {});

  const [categoriesAndPostsCount, setCategoriesAndPostsCount] =
    useState(categoryData);

  function sortingFunc1(posts) {
    const sortedPosts = [...posts].sort((a, b) => b.number - a.number);

    return sortedPosts;
  }

  function sortingFunc2(posts) {
    const sortedPosts = [...posts].sort((a, b) => a.number - b.number);

    return sortedPosts;
  }
  return (
    <>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home
                  sortName={selectedSortingMedthod}
                  setSortName={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={URL.category(":selectedCategory")}
            element={
              <>
                <Category
                  sortName={selectedSortingMedthod}
                  setSortName={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={URL.search}
            element={
              <>
                <Search
                  sortName={selectedSortingMedthod}
                  setSortName={setSelectedSortingMedthod}
                  sortingMedthodData={sortingMedthodData}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={URL.post(":_id")}
            element={
              <>
                <Post
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={URL.edit(":_id")}
            element={
              <>
                <Post
                  mode={"edit"}
                  categories={categories}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={URL.create}
            element={
              <>
                <Post
                  mode={"create"}
                  categories={categories}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                />
              </>
            }
          />
          <Route
            path={URL.god}
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
