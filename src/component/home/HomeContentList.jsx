import "./HomeContentList.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/axios/axios.js";

export default function HomeContentList({ sortName }) {
  const [posts, setPosts] = useState([]);

  // // const year = now.getFullYear().toString().slice(-2);
  // // const month = ("0" + (now.getMonth() + 1).toString()).slice(-2);
  // // const date = ("0" + now.getDate()).slice(-2);
  // // // const day = dayArr[now.getDay()];
  // // const hours = ("0" + now.getHours().toString()).slice(-2);
  // // const minutes = ("0" + now.getMinutes().toString()).slice(-2);
  // // const seconds = ("0" + now.getSeconds().toString()).slice(-2);

  // class DateClass {
  //   constructor() {
  //     this.now = new Date();
  //     this.year4 = this.now.getFullYear().toString();
  //     this.year2 = this.now.getFullYear().toString().slice(-2);
  //     this.month = ("0" + (this.now.getMonth() + 1).toString()).slice(-2);
  //     this.date = ("0" + this.now.getDate()).slice(-2);
  //     this.day = ["일", "월", "화", "수", "목", "금", "토"][this.now.getDay()];
  //     this.hour = ("0" + this.now.getHours().toString()).slice(-2);
  //     this.minute = ("0" + this.now.getMinutes().toString()).slice(-2);
  //     this.second = ("0" + this.now.getSeconds().toString()).slice(-2);
  //   }

  //   timeCode() {
  //     return `${this.year2}${this.month}${this.date}${this.hour}${this.minute}${this.second}`;
  //   }
  // }

  // const date = new DateClass();

  // console.log(date.timeCode());

  const postsList = posts.map((post, index) => {
    function convertDate(dateString) {
      // date는 12자리(년월일시분초) 숫자로 된 문자열

      const year = dateString[0] + dateString[1];
      const month = dateString[2] + dateString[3];
      const date = dateString[4] + dateString[5];
      const hours = dateString[6] + dateString[7];
      const minutes = dateString[8] + dateString[9];
      const seconds = dateString[10] + dateString[11];

      // const year = dateString.slice(0, 2);
      // const month = dateString.slice(2, 4);
      // const date = dateString.slice(4, 6);
      // const hours = dateString.slice(6, 8);
      // const minutes = dateString.slice(8, 10);
      // const seconds = dateString.slice(10, 12);

      return `${year}. ${month}. ${date}. / ${hours}:${minutes}:${seconds}`;
    }

    return (
      <Link to={"/posts/" + post._id} className="link" key={index}>
        <section className="contentList">
          <h2 className="subject">{post.title}</h2>
          <time className="date">{convertDate(post.date)}</time>
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
    getAllPosts();
  }, []);

  useEffect(() => {
    sortPosts();
  }, [sortName]);

  return (
    <>
      <main className="home-contentList_container">{postsList}</main>
    </>
  );
}
