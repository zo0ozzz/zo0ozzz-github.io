import "./Header.scss";
import { useEffect, useState } from "react";
import api from "../../lib/axios/axios";
import { Link } from "react-router-dom";
import { Nav } from "../nav/Nav";

const PageHeader = ({
  isGod,
  setIsGod,
  isMemo,
  setIsMemo,
  blogName,
  setBlogName,
}) => {
  // * mount function

  const changeBlogName = async () => {
    try {
      const response = await api.get("/god/blogName");
      const status = response.status;
      const data = response.data;

      const lastestBlogName = data.blogName;

      if (status === 200) {
        setBlogName((prev) => lastestBlogName);
      } else {
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // * useEffect

  // 첫 마운트 시에만 서버에 저장된 값으로 blogName을 최신화.
  useEffect(() => {
    if (blogName !== "") return;

    changeBlogName();
  }, []);

  return (
    <header className="header">
      <div className="header__blogName">
        <Link to="/" className="link blogName__link">
          <p className="blogName__name">{blogName}</p>
        </Link>
      </div>
      <div className="flexEmpty" />
      <div className="header__nav">
        <Nav
          isGod={isGod}
          setIsGod={setIsGod}
          isMemo={isMemo}
          setIsMemo={setIsMemo}
        />
      </div>
    </header>
  );
};
/* 사연:
앱 어디서든 헤더 & 푸터 요소가 보였으면 했다. 관리자 페이지에서도 예외는 아니었다. 그리고 이게 좀 문제가 됐다. 관리자 페이지와 그 페이지에서 수정할 데이터가 적용될 요소가 동시에 마운트되어 있다는 건, 수정된 데이터가 즉각적으로 해당 요소에 반영되어야 함을 뜻했다. 그러니까, 관리자 페이지에서 블로그 이름을 변경함과 동시에 헤더의 블로그 이름이 바뀌어야 하는 것이다. 이게 나로서는 꽤 골치 아픈 일로 다가왔다. 몇 번 이렇게 저렇게 시도하다가 관뒀다. 지금 와서 생각해보면 어려울 것도 없는 일이었지만.

그래서 관리자 페이지에 들어가면 헤더의 블로그 이름 자리를 관리자 페이지라는 문자열로 바꿨다. 그러면 간단해졌다. 관리자 페이지에선 각 요소에 적용되는 데이터를 수정해 서버에 보내고, 관리자 페이지를 나가면 일괄적으로 그 수정된 데이터를 각 컴포넌트에 적용시켜주면 됐다. 그러니까, 관리자 페이지와 관리자 페이지의 영향을 받는 컴포넌트를 공통 컴포넌트로 이어주는 게 아니라, 각 컴포넌트는 그냥 서버와만 데이터를 주고받으면 되는 것이다. 관리자 페이지에서 수정한 데이터가 해당 요소에 바로 적용되지 않아도 되니까. 관리자 페이지를 들어가고 나오는 것만 감지해주면 됐다. 그건 isGodPage 스테이트로 구현했다.

근데 코드를 다시 살펴보면서 어랍쇼 이렇게 하면 될 것 같은데 싶었다. 처음에 관뒀던 포인트가 blogName을 바꿀 때 무한루프에 빠지지 않기 위해 이것저것 해대느라 변수도 늘어나고 아무튼 막 복잡해져버린 것이었는데, 해결할 수 있는 방법이 보였다. 뭔가 마법처럼. 그때는 꽉 막혀서 어디로 가야 할지 감도 안 잡혔는데. 이런 경험을 할 때마다 이거야 신기한 일이라는 생각이 든다.

아무튼 해결했다. blogName을 수정하는 로직만 다른 것들(카테고리 등)과 좀 다르게 짰다. 후아 오늘 머리가 참 안 돌아가네.. 다음에 이어서 써야겠음.
*/

export default PageHeader;
