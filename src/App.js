import "./App.scss";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./component/common/PageHeader";
import PageFooter from "./component/common/PageFooter";
import HomeHellow from "./component/home/HomeHellow";
import HomeContentList from "./component/home/HomeContentList";
import SearchList from "./component/search/SearchList";
import Bar from "./component/common/Bar";
import Post from "./component/post/Post";

function App() {
  const [sortName, setSortName] = useState("최신순");

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
                <SearchList />
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
                <Post mode={"edit"} />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Post mode={"create"} />
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
