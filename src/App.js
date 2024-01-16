import "./App.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import api from "./lib/axios/axios";
import {
  HOME_PAGE,
  CATEGORY_PAGE,
  SEARCH_PAGE,
  POST_VIEW_PAGE,
  POST_EDIT_PAGE,
  POST_CREATE_PAGE,
  GOD_PAGE,
} from "./URL";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import Category from "./pages/category/Category";
import Search from "./pages/search/Search";
import Post from "./pages/post/Post";
import God from "./pages/god/God";
import Test from "./pages/test/Test";
import Login from "./pages/login/Login";
import { createPortal } from "react-dom";
import Memo from "./component/memo/Memo";

function App() {
  const [blogName, setBlogName] = useState("");
  const [isMemo, setIsMemo] = useState(false);
  const [isGod, setIsGod] = useState(true);
  const [isGodPage, setIsGodPage] = useState(false);
  const sortingMedthodData = [
    {
      id: 0,
      value: "최신순",
      name: "최신순",
      sortingFunc: (posts) => [...posts].sort((a, b) => b.number - a.number),
    },
    {
      id: 1,
      value: "오래된 순",
      name: "오래된 순",
      sortingFunc: (posts) => [...posts].sort((a, b) => a.number - b.number),
    },
  ];
  const [selectedSortingMedthod, setSelectedSortingMedthod] = useState(
    sortingMedthodData[0].value
  );

  // 메모)
  // 1. 분류 기본값을 인덱스(0) 말고 default라는 필드를 만들어서 구분하는 게 좋을까?
  // 2. 지금 id값이 안 쓰이고 있는데, [{}] 형태일 때는 id가 사용되지 않아도 넣어두는 게 좋을까?

  const [categoryData, setCategoryData] = useState([{}]);
  const [representativeCategoryName, setRepresentativeCategoryName] =
    useState("");

  // * useEffect
  // 관리자 페이지로 이동하거나 관리자 페이지를 빠져나올 때마다 카테고리 데이터를 업데이트.
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await api.get("/god/categoryData");
        const status = response.status;
        const data = response.data;

        if (status === 200) {
          const categoryData = data.categoryData;

          setCategoryData(categoryData);
        } else {
          console.log(status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategoryData();
  }, [isGodPage]);

  // 카테고리 데이터가 수정될 때마다 대표 카테고리 정보를 업데이트.
  useEffect(() => {
    // 카테고리 데이터가 초기값([{}])에서 업데이트 되지 않은 상태면 아무 동작도 하지 않음.
    if (categoryData.length === 1) return;
    // - 카테고리 데이터의 length 값으로 업데이트 상태를 판단.
    //  - 카테고리 데이터엔 기본적으로 '전체', '미분류'가 존재.
    //  - 카테고리가 업데이트 됐다면 length는 2 이상.

    const representativeCategoryName = categoryData.find(
      (item) => item.isRepresentative === true
    ).name;
    setRepresentativeCategoryName((prev) => representativeCategoryName);
  }, [categoryData]);

  // 전역에서 ESC 키로 메모장 켜기, 끄기
  useEffect(() => {
    const handleKeyDownBody = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();

        setIsMemo((prev) => !prev);
      }
    };

    // keyDown 이벤트를 전역으로 설정
    window.addEventListener("keydown", handleKeyDownBody);

    return () => window.removeEventListener("keydown", handleKeyDownBody);
  }, []);
  /* 사연: 
  처음엔 div app에 onKeyDown 속성을 부여해서 전역 이벤트를 설정하려고 했다. window.addEventLister를 쓰는 방법도 있었지만, 리액트에선 DOM에 직접 접근하는 일, 그러니까 addEventLister 등의 사용을 지양하라는 말을 들은 기억이 있었기 때문이다. 그건 원칙적으로 맞는 말이었다. 개발자의 의도를 리액트가 마련해둔 방법으로(가상돔을 조작하는 방식으로) 실현시키는 게 일단은 리액트가 권장하는 개발 방식이다(라고 나는 이해했다). 결과적으로 포커싱 문제 때문에 포기했다. 
  
  최초에 ESC를 눌러 메모장을 나타나게 하고, 다시 ESC를 눌러 메모장을 사라지게 하는 데까지는 잘 됐다. 하지만 그 상태(메모장이 사라진 상태)에서 다시 ESC를 눌렀을 땐 메모장이 등장해주지 않았다. 생각해보니 메모장이 닫히는 동시에 div app으로 포커싱이 가지 않으면, ESC를 눌러도 div app의 onKeyDown 이벤트가 동작하지 않는다. 메모장이 닫히는 순간 포커스는 body로 간다. 그럼 body에 이벤트리스너를 달아야 하나.. 하지만 그것 또한 DOM에 직접 접근하는 일이 된다.

  메모장이 꺼지는 순간 focus를 div app으로 설정해주는 것으로 ESC 키를 연속으로 눌렀을 때 이벤트가 제대로 작동하지 않는 문제는 해결했다. 하지만 여기서 또 문제가 발생하는데, 메모장이 꺼지고 포커스가 div app으로 가면 scrollY가 0이 된다. 그러니까, 스크롤이 맨 위로 올라간다. 이 동작은 막을 수가 없다. 현재 scroll 정보를 저장해서 메모장이 꺼짐과 동시에 그 위치로 이동시켜준다고 해도, 맨 위로 한 번 갔다가 와야 해서 정신 사납다. 이 문제를 해결할 방법이 생각이 안 나서, div app으로 전역 이벤트를 설정해주는 방식은 폐기하기로 했다.

  이 과정에서 기억해둬야 할 건, 전역 이벤트를 설정할 땐 window.addEventLister(...)를 사용하면 된다는 것이다. 타겟으로 body를 잡아도 비슷하게 되겠지만, window와 body는 좀 다르다. body의 너비가 300px이면 그 너비까지가 body다. 브라우저 창의 너비가 300px보다 크면 300px 너머의 위치는 window에는 포함되지만 body에는 포함되지 않는다. 이벤트를 정말 '전역'으로 설정해주고 싶다면 window.addEvent...를 써주는 게 맞다.
  */

  return (
    <>
      <div className="app">
        {isMemo
          ? createPortal(
              <Memo setIsMemo={setIsMemo} />,
              document.querySelector("#memo")
            )
          : null}
        <Header
          isGod={isGod}
          setIsGod={setIsGod}
          isGodPage={isGodPage}
          isMemo={isMemo}
          setIsMemo={setIsMemo}
          blogName={blogName}
          setBlogName={setBlogName}
        />
        <Routes>
          <Route
            path={HOME_PAGE}
            element={
              <Home
                sortingMedthodData={sortingMedthodData}
                selectedSortingMedthod={selectedSortingMedthod}
                setSelectedSortingMedthod={setSelectedSortingMedthod}
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                representativeCategoryName={representativeCategoryName}
              />
            }
          />
          <Route
            path="/login"
            element={<Login isGod={isGod} setIsGod={setIsGod} />}
          />
          <Route
            path={CATEGORY_PAGE(":categoryName")}
            element={
              <Category
                selectedSortingMedthod={selectedSortingMedthod}
                setSelectedSortingMedthod={setSelectedSortingMedthod}
                sortingMedthodData={sortingMedthodData}
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                representativeCategoryName={representativeCategoryName}
              />
            }
          />
          <Route
            path={SEARCH_PAGE}
            element={
              <Search
                selectedSortingMedthod={selectedSortingMedthod}
                setSelectedSortingMedthod={setSelectedSortingMedthod}
                sortingMedthodData={sortingMedthodData}
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                representativeCategoryName={representativeCategoryName}
              />
            }
          />
          <Route
            path={POST_VIEW_PAGE(":_id")}
            element={
              <>
                <Post
                  mode={"view"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  isGod={isGod}
                />
              </>
            }
          />
          <Route
            path={POST_EDIT_PAGE(":_id")}
            element={
              <>
                <Post
                  mode={"edit"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  isGod={isGod}
                />
              </>
            }
          />
          <Route
            path={POST_CREATE_PAGE}
            element={
              <>
                <Post
                  mode={"create"}
                  categoryData={categoryData}
                  setCategoryData={setCategoryData}
                  isGod={isGod}
                />
              </>
            }
          />
          <Route
            path={GOD_PAGE}
            element={
              <God
                setIsGodPage={setIsGodPage}
                categoryData={categoryData}
                setCategoryData={setCategoryData}
                blogName={blogName}
                setBlogName={setBlogName}
              />
            }
          />
          <Route path={"/test"} element={<Test />} />
        </Routes>
        <div className="empty"></div>
        <Footer />
      </div>
    </>
  );
}

export default App;
