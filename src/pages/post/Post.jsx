import "./Post.scss";
import { useParams } from "react-router-dom";
import PostEditor from "../../component/postEditor/PostEditor";
import PostViewer from "../../component/postViewer/PostViewer";

export default function Post({
  mode,
  categoryData,
  setCategoryData,
  allAndNoCategoryData,
}) {
  const { _id } = useParams();

  return (
    <>
      <div className="post">
        {mode ? (
          <PostEditor
            _id={_id}
            mode={mode}
            categoryData={categoryData}
            setCategoryData={setCategoryData}
            allAndNoCategoryData={allAndNoCategoryData}
          />
        ) : (
          <PostViewer _id={_id} setCategoryData={setCategoryData} />
        )}
      </div>
    </>
  );
}
