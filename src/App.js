import "./App.scss";
import { Link } from "react-router-dom";

function PageHeader() {
  const pageHeaderData = {
    pageName: "zo0ozzz",
    pageNav: [
      ["nav1", "#"],
      ["nav2", "#"],
      ["nav3", "#"],
    ],
  };
  const { pageName, pageNav } = pageHeaderData;

  const pageNavList = pageNav.map(([navName, navLink], index) => {
    return (
      <>
        <Link to={navLink} className="link" key={index}>
          <li>{navName}</li>
        </Link>
      </>
    );
  });

  return (
    <>
      <header className="page-header">
        <Link to="#" className="link">
          <p className="page-header-name">{pageName}</p>
        </Link>
        <div />
        <nav className="page-header-nav">
          <ul>{pageNavList}</ul>
        </nav>
      </header>
    </>
  );
}

function HomeContentSayHellow() {
  const hellow = [
    "안녕하세요.",
    "zo0ozzz의 블로그입니다.",
    "오늘도 좋은 날입니다.",
  ];

  const sayHellow = hellow.map((sentence, index) => (
    <p key={index}>{sentence}</p>
  ));

  return <section className="home-content-sayHellow">{sayHellow}</section>;
}

function App() {
  return (
    <>
      <div className="page-wrapper">
        <PageHeader />
        <div className="home-content">
          <HomeContentSayHellow />
          <main className="home-content-subjectList">
            <ul>
              <li>제목1</li>
              <li>제목2</li>
              <li>제목3</li>
              <li>제목4</li>
              <li>제목5</li>
            </ul>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
