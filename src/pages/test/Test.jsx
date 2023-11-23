import "./Test.scss";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Test() {
  const prevCategoryData = [
    {
      isAllCategory: true,
      isRepresentative: true,
      id: 0,
      name: "전체",
      postCount: 2,
    },
    {
      isRepresentative: false,
      id: 1,
      name: "블로그",
      postCount: 0,
    },
    {
      isRepresentative: false,
      id: 2,
      name: "기타",
      postCount: 0,
    },
    {
      isRepresentative: false,
      id: 3,
      name: "뿅뿅뿅",
      postCount: 1,
    },
    {
      isRepresentative: false,
      isNoCategory: true,
      id: 4,
      name: "미분류",
      postCount: 1,
    },
  ];

  const newCategoryData = [
    {
      isAllCategory: true,
      isRepresentative: true,
      id: 0,
      name: "전체",
      postCount: 2,
    },
    {
      isRepresentative: false,
      id: 1,
      name: "블로고",
      postCount: 0,
    },
    {
      isRepresentative: false,
      id: 2,
      name: "드럼",
      postCount: 0,
    },
    {
      isRepresentative: false,
      isNoCategory: true,
      id: 4,
      name: "미분류",
      postCount: 1,
    },
  ];

  const prevIds = prevCategoryData.map((item) => item.id);
  console.log("prevIds: ", prevIds);

  let arr = [];
  for (const prevItem of prevCategoryData) {
    const result = newCategoryData.filter(
      (newItem) => newItem.id === prevItem.id && newItem.name !== prevItem.name
    );

    console.log("ddd", result);
  }
  // 이런 식으로 카테고리 이름이 바뀐 경우를 찾아낼 수 있음.
  // 여기서는 새로운 데이터 중 변경된 데이터의 id와 기존 이름, 새로운 이름을 얻으면 됨.

  let arr2 = [];
  prevIds.forEach((id, index) => {
    const result = newCategoryData.find((newItem) => newItem.id === id);

    if (result === undefined && prevCategoryData[index].postCount > 0) {
      arr2.push(index);
    }
  });
  // 여기서는 기존 데이터 중 포스트가 들어 있는 채 삭제된 카테고리의 이름을 얻으면 됨.

  console.log("삭제된 카테고리의 인덱스", arr2);

  // for(const id of prevIds) {
  //   const result = newCategoryData.find((newItem) => newItem.id === id  );

  //   if(result === undefined) {
  //     arr2.push(newCategoryData[index])
  //   }
  // }

  return (
    <>
      <div className="test">
        <div className="test-info">
          <p style={{ fontWeight: "bold", margin: "10px 5px 10px 5px" }}>
            {`<테스트 페이지>`}
          </p>
        </div>
      </div>
    </>
  );
}
