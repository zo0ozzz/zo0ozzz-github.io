import "./Home.scss";
import Hellow from "../../component/hellow/Hellow";
import SearchAndSortingBar from "../../component/toolBar/ToolBar";
import CategoryBar from "../../component/categoryBar/CategoryBar";
import PostList from "../../component/postList/PostList";

export default function Home({
  sortName,
  setSortName,
  sortingMedthodData,
  categories,
  categoriesAndPostsCount,
  categoryData,
  setCategoryData,
  setCategoriesAndPostsCount,
}) {
  return (
    <>
      <Hellow />
      <SearchAndSortingBar
        sortName={sortName}
        setSortName={setSortName}
        sortingMedthodData={sortingMedthodData}
      />
      <CategoryBar
        categories={categories}
        categoriesAndPostsCount={categoriesAndPostsCount}
        setCategoriesAndPostsCount={setCategoriesAndPostsCount}
        sortingMedthodData={sortingMedthodData}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
      />
      <PostList
        sortName={sortName}
        setSortName={setSortName}
        sortingMedthodData={sortingMedthodData}
      />
    </>
  );
}
