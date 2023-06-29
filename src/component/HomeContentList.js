import "./HomeContentList.scss";
import { Link } from "react-router-dom";

export function HomeContentList() {
  const contentData = Array(50).fill(null);
  const contentList = contentData.map((data) => {
    return (
      <Link to="#" className="link">
        <section className="contentList">
          <h2 className="subject">
            전면개정판이기적유전자진화론의새로운패러다임
          </h2>
          <time className="date">2023년 6월 26일</time>
        </section>
      </Link>
    );
  });

  return (
    <>
      <main className="home-contentList_container">{contentList}</main>
    </>
  );
}
