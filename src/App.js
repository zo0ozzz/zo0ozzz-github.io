import "./App.scss";
import { Route, Routes } from "react-router-dom";
import PageHeader from "./component/common/PageHeader";
import PageFooter from "./component/common/PageFooter";
import HomeHellow from "./component/home/HomeHellow";
import HomeContentList from "./component/home/HomeContentList";
// import PostViewer from "./component/post/PostReader";
// import PostEditor from "./component/post/PostEditor";
// import PostCreator from "./component/post/PostCreator";
import Post from "./component/post/Post";

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
        <PageFooter />
      </div>
    </>
  );
}

export default App;
