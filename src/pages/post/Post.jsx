import "./Post.scss";
import { useParams } from "react-router-dom";
import PostEditor from "../../component/postEditor/PostEditor";
import PostViewer from "../../component/postViewer/PostViewer";
// import ToolBar from "../../component/toolBar/ToolBar";
// import CategoryBar from "../../component/categoryBar/CategoryBar";

export default function Post({ mode, categoryData, setCategoryData, isGod }) {
  const { _id } = useParams();

  return (
    <>
      <div className="post">
        <div className="otherPosts">
          <p>이전 글: 버블티에 대하여</p>
          <p>다음 글: 부동산 버블은 언제 터지는가</p>
        </div>
        <div className="editor">
          {mode === "edit" || mode === "create" ? (
            <PostEditor
              _id={_id}
              mode={mode}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
              isGod={isGod}
            />
          ) : mode === "view" ? (
            <PostViewer
              _id={_id}
              mode={mode}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
              isGod={isGod}
            />
          ) : null}
        </div>
        <div className="otherPosts">
          <p>이전 글: 버블티에 대하여</p>
          <p>다음 글: 부동산 버블은 언제 터지는가</p>
        </div>
      </div>
    </>
  );
}
