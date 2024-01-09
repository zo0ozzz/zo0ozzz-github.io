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
  console.log(isMemo);
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
  const [categoryData, setCategoryData] = useState([{}]);
  const [representativeCategoryName, setRepresentativeCategoryName] =
    useState("");

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

  // useEffect
  useEffect(() => {
    getCategoryData();

    return;
  }, [isGodPage]);

  useEffect(() => {
    if (categoryData.length === 1) return;
    // - 카테고리 데이터가 업데이트 되지 않으면 아무 동작도 하지 않음.
    //  - 전체, 미분류가 기본이라 업데이트된 상태라면 length가 1이 되지 않으니까.

    const representativeCategoryName = categoryData.find(
      // - 카테고리 데이터가 업데이트 되면
      // - 대표 카테고리를 찾아(isRe... === true) 저장.
      (item) => item.isRepresentative === true
    ).name;
    setRepresentativeCategoryName((prev) => representativeCategoryName);

    return;
  }, [categoryData]);

  useEffect(() => {
    const handleKeyDownBody = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();

        setIsMemo((prev) => !prev);
      }
    };

    const body = document.querySelector("body");

    body.addEventListener("keydown", handleKeyDownBody);

    return () => body.removeEventListener("keydown", handleKeyDownBody);
  }, []);

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
