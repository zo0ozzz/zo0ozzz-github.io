import "./PostList.scss";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";

export default function PostList({
  selectedSortingMedthod,
  sortingMedthodData,
  categoryData,
  representativeCategoryName,
}) {
  const { selectedCategory } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchString = searchParams.get("searchString");
  const [posts, setPosts] = useState([]);

  const postsList = posts.map((post, index) => {
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
        <section className="contentList">
          <h2 className="subject">{post.title}</h2>
          <div className="number">#{post.number}</div>
          <time className="date">{convertDate(post.createDate)}</time>
        </section>
      </Link>
    );
  });

  async function getAllPosts() {
    try {
      const response = await api.get("/post");
      const status = response.status;
      const posts = response.data;

      if (status === 200) {
        const sortedPosts = getSortedPosts(posts);
        setPosts(sortedPosts);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategoryPosts(selectedCategory) {
    try {
      const response = await api.get("/post/categories/" + selectedCategory);
      const status = response.status;
      const posts = response.data;

      if (status === 200) {
        const sortedPosts = getSortedPosts(posts);
        setPosts(sortedPosts);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSearchPosts() {
    try {
      const response = await api.get(
        "/post/search?searchString=" + searchString
      );
      const status = response.status;
      const posts = response.data;

      if (status === 200) {
        const sortedPosts = getSortedPosts(posts);
        setPosts(sortedPosts);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getSortedPosts(posts) {
    const sortingFunc = sortingMedthodData.find(
      (item) => item.value === selectedSortingMedthod
    ).sortingFunc;

    const sortedPosts = sortingFunc(posts);

    return sortedPosts;
  }

  useEffect(() => {
    if (categoryData.length === 1) {
      // 아직 카테고리 데이터가 업데이트되지 않은 경우
      return;
    }

    if (!selectedCategory && !searchString) {
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

    if (searchString) {
      // 내용 검색으로 들어온 경우
      getSearchPosts();

      return;
    }
  }, [selectedCategory, searchString, representativeCategoryName]);

  useEffect(() => {
    const sortedPosts = getSortedPosts(posts);
    setPosts(sortedPosts);
  }, [selectedSortingMedthod]);

  return (
    <>
      {searchString ? (
        <span className="postList-info">검색어: {searchString}</span>
      ) : null}

      <main className="home-contentList_container">{postsList}</main>
    </>
  );
}
