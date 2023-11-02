import "./App.scss";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./component/common/PageHeader";
import HomeHellow from "./component/home/HomeHellow";
import Bar from "./component/common/Bar";
import Category from "./component/category/Category";
import HomeContentList from "./component/home/HomeContentList";
import SearchList from "./component/search/SearchList";
import Post from "./component/post/Post";
import PageFooter from "./component/common/PageFooter";

function App() {
  const [sortName, setSortName] = useState("최신순");
  // const [categories, setCategories] = useState(["블로그", "기타"]);
  const categories = ["블로그", "기타", "뿅뿅뿅"];

  return (
    <>
      <div className="wrapper">
        <PageHeader />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeHellow />
                <Bar sortName={sortName} setSortName={setSortName} />
                <Category categories={categories} />
                <HomeContentList
                  sortName={sortName}
                  setSortName={setSortName}
                />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <HomeHellow />
                <Bar sortName={sortName} setSortName={setSortName} />
                <Category categories={categories} />
                <SearchList sortName={sortName} />
              </>
            }
          />
          <Route
            path="/posts/:_id"
            element={
              <>
                <Post />
              </>
            }
          />
          <Route
            path="/edit/:_id"
            element={
              <>
                <Post mode={"edit"} categories={categories} />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Post mode={"create"} categories={categories} />
              </>
            }
          />
        </Routes>
        <div class="empty"></div>
        <PageFooter />
      </div>
    </>
  );
}

export default App;
