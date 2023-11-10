import "./Home.scss";
import Hellow from "../../component/hellow/Hellow";
import ToolBar from "../../component/toolBar/ToolBar";
import CategoryBar from "../../component/categoryBar/CategoryBar";
import PostList from "../../component/postList/PostList";

export default function Home({
  sortName,
  setSortName,
  sortingMedthodData,
  categoryData,
  setCategoryData,
}) {
  return (
    <>
      <Hellow />
      <ToolBar
        sortName={sortName}
        setSortName={setSortName}
        sortingMedthodData={sortingMedthodData}
      />
      <CategoryBar
        categoryData={categoryData}
        setCategoryData={setCategoryData}
      />
      <PostList sortName={sortName} sortingMedthodData={sortingMedthodData} />
    </>
  );
}
