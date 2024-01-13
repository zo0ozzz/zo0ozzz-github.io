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

  // const appRef = useRef(null);

  // mount function
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

  // * useEffect
  // 관리자 페이지로 이동하거나 관리자 페이지를 빠져나올 때마다 카테고리 데이터를 업데이트.
  useEffect(() => {
    getCategoryData();
  }, [isGodPage]);

  // 카테고리 데이터가 수정될 때마다 대표 카테고리 정보를 업데이트.
  useEffect(() => {
    // 카테고리 데이터가 초기값([{}])에서 업데이트 되지 않은 상태면 아무 동작도 하지 않음.
    if (categoryData.length === 1) return;
    // 카테고리 데이터의 length 값으로 업데이트 상태를 판단.
    //  - 카테고리 데이터엔 기본적으로 '전체', '미분류'가 존재.
    //    - [{전체...}, {미분류...}, ...] 형태로.
    //  - 카테고리가 업데이트 됐다면 length는 2 이상.

    const representativeCategoryName = categoryData.find(
      (item) => item.isRepresentative === true
    ).name;
    setRepresentativeCategoryName((prev) => representativeCategoryName);
  }, [categoryData]);

  // ESC 키로 메모장 켜기, 끄기 이벤트를 웹페이지 전역에 부착.
  useEffect(() => {
    const handleKeyDownBody = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();

        setIsMemo((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDownBody);
    // 전역 이벤트는 window 객체에
    // 처음엔 div app에 onKeyDown 이벤트를 걸었지만 실패.
    //  - div는 포커싱이 안 되는 요소로 keyDown 이벤트를 붙일 수 없음.
    //  - tabIndex={0} 속성으로 div가 포커스를 받을 수 있게 할 수 있지만,
    //  - 아웃라인도 생기고
    // dom + 이벤트 리스너로 해결함.
    //  - 리액트에서 이벤트 리스너 써도 되는지 모르겠음.

    return () => window.removeEventListener("keydown", handleKeyDownBody);
  }, []);

  console.log(isMemo);

  const appRef = useRef(null);

  // 포커스가 appdiv에 간다? -> 위로 이동해버림. 위치가.
  // 현재 위치를 찍어서 바로 옮긴다? 음... 그렇게까지 해야 하나..

  return (
    <>
      <div className="app" ref={appRef}>
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
