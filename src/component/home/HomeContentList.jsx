import "./HomeContentList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/axios/axios.js";

export default function HomeContentList() {
  const [posts, setPosts] = useState([]);

  const postsList = posts.map((post, index) => {
    return (
      <Link to={"/posts/" + post._id} className="link" key={index}>
        <section className="contentList">
          <h2 className="subject">{post.title}</h2>
          <time className="date">{post.date}</time>
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
        setPosts(posts);
      } else {
        console.log("get, /post 요청 실패", "status: ", status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <main className="home-contentList_container">{postsList}</main>
    </>
  );
}
