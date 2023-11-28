import "./Home.scss";
import { useMemo } from "react";
import Hellow from "../../component/hellow/Hellow";
import ToolBar from "../../component/toolBar/ToolBar";
import CategoryBar from "../../component/categoryBar/CategoryBar";
import PostList from "../../component/postList/PostList";

export default function Home({
  selectedSortingMedthod,
  setSelectedSortingMedthod,
  sortingMedthodData,
  categoryData,
  setCategoryData,
  representativeCategoryName,
}) {
  const hellowComponent = useMemo(() => {
    return (
      <>
        <Hellow />
      </>
    );
  }, []);
  return (
    <>
      {hellowComponent}
      {/* <Hellow /> */}
      <ToolBar
        sortingMedthodData={sortingMedthodData}
        selectedSortingMedthod={selectedSortingMedthod}
        setSelectedSortingMedthod={setSelectedSortingMedthod}
      />
      <CategoryBar
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        representativeCategoryName={representativeCategoryName}
      />
      <PostList
        selectedSortingMedthod={selectedSortingMedthod}
        sortingMedthodData={sortingMedthodData}
        categoryData={categoryData}
        representativeCategoryName={representativeCategoryName}
      />
    </>
  );
}
