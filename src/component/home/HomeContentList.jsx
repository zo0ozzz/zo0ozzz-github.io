import "./HomeContentList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HTMLRenderer } from "../common/HTMLRenderer";

export function HomeContentList() {
  const [posts, setPosts] = useState([]);
  const postsList = posts.map((post) => {
    return (
      <Link to={`/posts/${post.id}`} className="link">
        <section className="contentList">
          <h2 className="subject">
            {/* 전면개정판이기적유전자진화론의새로운패러다임 */}
            {post.title}
          </h2>
          <time className="date">{post.date}</time>
        </section>
      </Link>
    );
  });

  useEffect(() => {
    fetch("http://localhost:9999/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  return (
    <>
      <main className="home-contentList_container">{postsList}</main>
    </>
  );
}
