import "./HomeContentList.scss";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";

export default function HomeContentList({ sortName }) {
  const { selectedCategory } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchString = searchParams.get("searchString");
  console.log(searchParams);

  const [posts, setPosts] = useState([]);

  const postsList = posts.map((post, index) => {
    function convertDate(dateString) {
      // date는 12자리(년월일시분초) 숫자로 된 문자열

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
          <div className="number">no.{post.number}</div>
          <time className="date">{convertDate(post.createDate)}</time>
        </section>
      </Link>
    );
  });

  async function getAllPosts() {
    try {
      const response = await api.get("/post");
      const status = response.status;
      let posts = response.data;

      if (status === 200) {
        if (sortName === "오래된 순") {
          const sortedPosts = [...posts].sort((a, b) => a.number - b.number);

          setPosts(sortedPosts);

          return;
        }

        const sortedPosts = posts.sort((a, b) => b.number - a.number);

        setPosts(sortedPosts);
      } else {
        console.log("get, /post 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategoryPosts() {
    try {
      const response = await api.get("/post/categories/" + selectedCategory);
      const status = response.status;
      let categoryPosts = response.data;

      if (status === 200) {
        if (sortName === "오래된 순") {
          const sortedPosts = [...categoryPosts].sort(
            (a, b) => a.number - b.number
          );

          setPosts(sortedPosts);

          return;
        }

        const sortedPosts = [...categoryPosts].sort(
          (a, b) => b.number - a.number
        );

        setPosts(sortedPosts);
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
      let posts = response.data;

      if (status === 200) {
        if (sortName === "오래된 순") {
          const sortedPosts = [...posts].sort((a, b) => a.number - b.number);

          setPosts(sortedPosts);

          return;
        }

        const sortedPosts = [...posts].sort((a, b) => b.number - a.number);

        setPosts(sortedPosts);
      } else {
        console.log("get, /post 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function sortPosts() {
    if (sortName === "최신순") {
      const sortedPosts = [...posts].sort((a, b) => b.number - a.number);

      setPosts(sortedPosts);

      return;
    }

    if (sortName === "오래된 순") {
      const sortedPosts = [...posts].sort((a, b) => a.number - b.number);

      setPosts(sortedPosts);

      return;
    }
  }

  useEffect(() => {
    if (!selectedCategory && !searchString) {
      getAllPosts();

      return;
    }

    if (selectedCategory) {
      getCategoryPosts();

      return;
    }

    if (searchString) {
      console.log("반응");
      getSearchPosts();

      return;
    }
  }, [selectedCategory, searchString]);

  useEffect(() => {
    sortPosts();
  }, [sortName]);

  return (
    <>
      <main className="home-contentList_container">{postsList}</main>
    </>
  );
}
