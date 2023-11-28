import "./Post.scss";
import { useParams } from "react-router-dom";
import PostEditor from "../../component/postEditor/PostEditor";
import PostViewer from "../../component/postViewer/PostViewer";

export default function Post({ mode, categoryData, setCategoryData, isGod }) {
  const { _id } = useParams();

  return (
    <>
      <div className="post">
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
    </>
  );
}
