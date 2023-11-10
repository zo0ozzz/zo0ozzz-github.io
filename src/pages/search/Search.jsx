import "./Search.scss";
import Hellow from "../../component/hellow/Hellow";
import ToolBar from "../../component/toolBar/ToolBar";
import CategoryBar from "../../component/categoryBar/CategoryBar";
import PostList from "../../component/postList/PostList";

export default function Search({
  sortingMedthodData,
  selectedSortingMedthod,
  setSelectedSortingMedthod,
  categoryData,
  setCategoryData,
}) {
  return (
    <>
      <Hellow />
      <ToolBar
        sortingMedthodData={sortingMedthodData}
        selectedSortingMedthod={selectedSortingMedthod}
        setSelectedSortingMedthod={setSelectedSortingMedthod}
      />
      <CategoryBar
        categoryData={categoryData}
        setCategoryData={setCategoryData}
      />
      <PostList
        sortingMedthodData={sortingMedthodData}
        selectedSortingMedthod={selectedSortingMedthod}
        setSelectedSortingMedthod={setSelectedSortingMedthod}
      />
    </>
  );
}
