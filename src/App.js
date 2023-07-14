import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { PageHeader } from "./component/common/PageHeader";
import { PageFooter } from "./component/common/PageFooter";
import { HomeHellow } from "./component/home/HomeHellow";
import { HomeContentList } from "./component/home/HomeContentList";
import { Post } from "./component/posts/Post";

function App() {
  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageHeader />
                <HomeHellow />
                <HomeContentList />
                <PageFooter />
              </>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <>
                <PageHeader />
                <Post />
                <PageFooter />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
