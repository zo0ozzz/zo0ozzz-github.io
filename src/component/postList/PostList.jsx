import "./PostList.scss";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import Label2 from "../label2/Label2.jsx";

export default function PostList({
  sortingMedthodData,
  selectedSortingMedthod,
  categoryData,
  representativeCategoryName,
}) {
  const { selectedCategory } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("searchQuery");
  const [postsData, setPostsData] = useState([]);
  const [posts, setPosts] = useState([]);

  // mount function
  const getCategoryPosts = async (selectedCategory) => {
    try {
      const response = await api.get("/post/categories/" + selectedCategory);
      const status = response.status;
      const { categoryPosts } = response.data;

      if (status === 200) {
        setPostsData((prev) => categoryPosts);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getSearchPosts() {
    try {
      const response = await api.get("/post/search?searchQuery=" + searchQuery);
      const status = response.status;
      const { searchPosts } = response.data;

      if (status === 200) {
        setPostsData((prev) => searchPosts);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error.status);
    }
  }

  const getSortedPosts = (postsData) => {
    const sortingFunc = sortingMedthodData.find(
      (item) => item.value === selectedSortingMedthod
    ).sortingFunc;

    const sortedPosts = sortingFunc(postsData);

    return sortedPosts;
  };

  useEffect(() => {
    if (categoryData.length === 1) {
      // 아직 카테고리 데이터가 업데이트되지 않은 경우
      return;
    }

    if (!selectedCategory && !searchQuery) {
      // - url이 '/'(홈)이면 이쪽으로
      // - 대표 카테고리의 자료들이 뿌려짐

      getCategoryPosts(representativeCategoryName);

      return;
    }

    if (selectedCategory) {
      // 카테고리를 클릭해서 들어온 경우
      getCategoryPosts(selectedCategory);

      return;
    }

    if (searchQuery) {
      // 내용 검색으로 들어온 경우
      getSearchPosts();

      return;
    }
  }, [representativeCategoryName, selectedCategory, searchQuery]);

  useEffect(() => {
    const sortedPostsData = getSortedPosts(postsData);

    setPosts((prev) => sortedPostsData);
  }, [postsData, selectedSortingMedthod]);

  // element
  const list = posts.map((post, index) => {
    function convertDate(dateString) {
      // ex) dateString = 20230318목121212
      const year = dateString.slice(2, 4);
      const month = dateString.slice(4, 6);
      const date = dateString.slice(6, 8);
      const day = dateString.slice(8, 9);
      const hours = dateString.slice(9, 11);
      const minutes = dateString.slice(11, 13);
      const seconds = dateString.slice(13, 15);

      return `${year}. ${month}. ${date}. (${day}) ${hours}:${minutes}:${seconds}`;
    }

    return (
      <Link to={"/posts/" + post._id} className="link" key={index}>
        <section className="postList__post">
          <h1 className="subject">{post.title}</h1>
          <div className="number">#{post.number}</div>
          <time className="date">{convertDate(post.createDate)}</time>
        </section>
      </Link>
    );
  });

  return (
    <div classNama="postList">
      {searchQuery ? (
        <div className="postList__searchInfo">
          <div className="searchInfo">
            <Label2 className="searchInfo__label" name="검색어: " />
            <p className="searchInfo__searchQuery">{searchQuery}</p>
            {posts[0] === undefined ? (
              <p className="searchInfo__message">검색된 게시물이 없습니다.</p>
            ) : null}
          </div>
        </div>
      ) : null}
      {list}
      {/* <main className="home-contentList_container">{postsList}</main> */}
    </div>
  );
}
