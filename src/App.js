import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { PageHeader } from "./component/common/PageHeader";
import { PageFooter } from "./component/common/PageFooter";
import { HomeHellow } from "./component/home/HomeHellow";
import { HomeContentList } from "./component/home/HomeContentList";
import { Post } from "./component/posts/Edit";

function App() {
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
                <HomeContentList />
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
                <Edit />
              </>
            }
          />
          <Route
            path="/create/:_id"
            element={
              <>
                <Create />
              </>
            }
          />
        </Routes>
        <PageFooter />
      </div>
    </>
  );
}

export default App;
