import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bar.scss";

function Bar({ sortName, setSortName }) {
  const [selectValue, setSelectValue] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const handleClickSearchButton = (e) => {
    e.preventDefault();

    const ref = searchInputRef.current;
    const value = ref.value;

    console.log(value);

    navigate("/search?searchString=" + value);
    // navigate("/search");
  };

  const handleChangeSelect = (e) => {
    const sortName = e.target.value;

    setSortName(sortName);
  };

  useEffect(() => {
    setSelectValue(sortName);
  }, [sortName]);

  return (
    <div class="container-bar">
      <div class="wrapper-searchInput">
        <form action="">
          <label htmlFor="search">검색:</label>
          <input
            type="text"
            id="search"
            autoComplete="off"
            ref={searchInputRef}
          />
          <input type="submit" value="확인" onClick={handleClickSearchButton} />
        </form>
      </div>

      <div class="wraaper-sortButton">
        <form action="">
          <label htmlFor="sort">정렬:</label>
          <select
            name=""
            id="sort"
            value={selectValue}
            onChange={handleChangeSelect}
          >
            <option value="최신순">최신순</option>
            <option value="오래된 순">오래된 순</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Bar;
