import "./App.scss";
import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./component/header/Header";
import HomeHellow from "./component/hellow/Hellow";
import SearchAndSortingBar from "./component/searchAndSortingBar/SearchAndSortingBar";
import CategoryBar from "./component/categoryBar/CategoryBar";
import PostList from "./component/postList/PostList";
import SearchList from "./창고/SearchList";
import Post from "./pages/post/Post";
import PageFooter from "./component/footer/Footer";
import Home from "./pages/home/Home";
// import setting from "./setting.js";

function App() {
  const [sortName, setSortName] = useState("최신순");
  const [categories, setCategories] = useState([
    "블로그",
    "기타",
    "뿅뿅뿅",
    "미분류",
  ]);
  const initialCategoriesObject = categories.reduce((acc, eachCategory) => {
    acc[eachCategory] = "-";
    return acc;
  }, {});
  const [categoriesAndPostsCount, setCategoriesAndPostsCount] = useState(
    initialCategoriesObject
  );
  // const categories = setting.categories;
  // const categories = useMemo(() => ["블로그", "기타", "뿅뿅뿅"], []);

  return (
    <>
      <div className="wrapper">
        <PageHeader />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                {/*  */}
                <HomeHellow />
                <SearchAndSortingBar
                  sortName={sortName}
                  setSortName={setSortName}
                />
                <CategoryBar
                  categories={categories}
                  categoriesAndPostsCount={categoriesAndPostsCount}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                />
                <PostList sortName={sortName} setSortName={setSortName} />
              </>
            }
          />
          <Route
            path="/categories/:selectedCategory"
            // 이걸 쿼리 스트링으로 보내면 뒤에 추가를 안 해줘도 됨!
            element={
              <>
                <HomeHellow />
                <SearchAndSortingBar
                  sortName={sortName}
                  setSortName={setSortName}
                />
                <CategoryBar
                  categories={categories}
                  categoriesAndPostsCount={categoriesAndPostsCount}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                />
                <PostList sortName={sortName} setSortName={setSortName} />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <HomeHellow />
                <SearchAndSortingBar
                  sortName={sortName}
                  setSortName={setSortName}
                />
                <CategoryBar
                  categories={categories}
                  categoriesAndPostsCount={categoriesAndPostsCount}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                />
                <PostList sortName={sortName} setSortName={setSortName} />
              </>
            }
          />
          <Route
            path="/posts/:_id"
            element={
              <>
                <Post setCategoriesAndPostsCount={setCategoriesAndPostsCount} />
              </>
            }
          />
          <Route
            path="/edit/:_id"
            element={
              <>
                <Post
                  mode={"edit"}
                  categories={categories}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Post
                  mode={"create"}
                  categories={categories}
                  setCategoriesAndPostsCount={setCategoriesAndPostsCount}
                />
              </>
            }
          />
        </Routes>
        <div className="empty"></div>
        <PageFooter />
      </div>
    </>
  );
}

export default App;
