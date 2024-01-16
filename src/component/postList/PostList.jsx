import "./PostList.scss";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../lib/axios/axios.js";
import Label2 from "../label2/Label2.jsx";

export default function PostList({
  sortingMedthodData,
  selectedSortingMedthod,
  categoryData,
  representativeCategoryName,
}) {
  const { categoryName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("searchQuery");
  const [posts, setPosts] = useState([]);

  // mount function
  const getSortedPosts = (posts) => {
    const sortingFunc = sortingMedthodData.find(
      (item) => item.value === selectedSortingMedthod
    ).sortingFunc;

    const sortedPosts = sortingFunc(posts);

    return sortedPosts;
  };

  const getCategoryPosts = async (categoryName) => {
    try {
      const response = await api.get("/post/categories/" + categoryName);
      const status = response.status;
      const { categoryPosts } = response.data;

      if (status === 200) {
        setPosts((prev) => getSortedPosts(categoryPosts));
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchPosts = async (searchQuery) => {
    try {
      const response = await api.get("/post/search?searchQuery=" + searchQuery);
      const status = response.status;
      const { searchPosts } = response.data;

      if (status === 200) {
        setPosts((prev) => getSortedPosts(searchPosts));
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error.status);
    }
  };

  // useEffect
  useEffect(() => {
    // 카테고리 데이터가 초기값인(아직 업데이트되지 않은) 경우
    if (categoryData.length === 1) {
      // - 아무 동작도 하지 않음.
      return;
    }

    // 홈 페이지에서 렌더링된 경우
    if (!categoryName && !searchQuery) {
      // - url이 '/'(홈)이면 이쪽으로 오게 됨.
      //  - categoryName -> undifined, searchQuery -> null 할당.
      getCategoryPosts(representativeCategoryName);
      // - 대표 카테고리가 호출되어 posts를 구성.
    }

    // 카테고리 페이지에서 렌더링된 경우
    if (categoryName) {
      getCategoryPosts(categoryName);
      // - 해당 카테고리가 호출되어 posts를 구성.
    }

    // search 페이지에서 렌더링된 경우
    if (searchQuery) {
      getSearchPosts(searchQuery);
      // - 검색어로 찾은 post들로 posts를 구성.
    }
  }, [
    representativeCategoryName,
    categoryName,
    searchQuery,
    selectedSortingMedthod,
  ]);

  // element
  const list = posts.map((post, index) => {
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
      <div className="list__postBox" key={index}>
        <div className="postBox">
          <Link to={"/posts/" + post._id} className="link postBox__link">
            <section className="postBox__postInfoWrapper">
              <h1 className="postBox__title">{post.title}</h1>
              <div className="postBox__number">#{post.number}</div>
              <time className="postBox__createDate">
                {convertDate(post.createDate)}
              </time>
            </section>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="postList">
      <div className="postList__resultInfo">
        <ResultInfo
          searchQuery={searchQuery}
          categoryName={categoryName}
          posts={posts}
        />
        {/* - 이거 상위 컴포넌트로 옮겨야 하는데 옮기면 따라 옮겨야 될 게 많아서 일단 분리만 해둠. */}
      </div>
      <div className="postList__list">
        <div className="list">{list}</div>
      </div>
    </div>
  );
}

const ResultInfo = ({ categoryName, searchQuery, posts }) => {
  const message = {
    search: "게시물 없음 ㅠㅠ",
    category: "게시물 없음 ㅠㅠ",
  };

  return (
    <>
      {categoryName ? (
        <div className="resultInfo">
          {posts[0] === undefined ? (
            <div className="resultInfo__messageWrapper">
              <p className="resultInfo__message">{message.category}</p>
            </div>
          ) : null}
        </div>
      ) : searchQuery ? (
        <div className="resultInfo">
          <div className="resultInfo__wrapper">
            <Label2 className="resultInfo__label" name="검색어: " />
            <p className="resultInfo__searchQuery">{searchQuery}</p>
          </div>
          {posts[0] === undefined ? (
            <div className="resultInfo__messageWrapper">
              <p className="resultInfo__message">{message.search}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
