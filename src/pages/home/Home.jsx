import "./Home.scss";
import Hellow from "../../component/hellow/Hellow";
import SearchAndSortingBar from "../../component/searchAndSortingBar/SearchAndSortingBar";
import CategoryBar from "../../component/categoryBar/CategoryBar";
import PostList from "../../component/postList/PostList";

export default function Home({
  sortName,
  setSortName,
  categories,
  categoriesAndPostsCount,
  setCategoriesAndPostsCount,
}) {
  return (
    <>
      <Hellow />
      <SearchAndSortingBar sortName={sortName} setSortName={setSortName} />
      <CategoryBar
        categories={categories}
        categoriesAndPostsCount={categoriesAndPostsCount}
        setCategoriesAndPostsCount={setCategoriesAndPostsCount}
      />
      <PostList sortName={sortName} setSortName={setSortName} />
    </>
  );
}
