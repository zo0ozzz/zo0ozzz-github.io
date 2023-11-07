import "./ToolBar.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Searcher from "../searcher/Searcher";
import SortingSelector from "../sortingSelector/SortingSelector";

export default function ToolBar({ sortName, setSortName }) {
  // const [selectValue, setSelectValue] = useState("");
  const navigate = useNavigate();
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleClickSearchButton = (e) => {
    e.preventDefault();

    navigate("/search?searchString=" + searchInputValue);
  };

  const handleChangeSearchInput = (e) => {
    const value = e.target.value;

    setSearchInputValue(value);
  };

  // const handleChangeSelect = (e) => {
  //   const sortName = e.target.value;

  //   setSortName(sortName);
  // };

  // useEffect(() => {
  //   setSelectValue(sortName);
  // }, [sortName]);

  return (
    <div className="toolBar">
      <Searcher />
      <SortingSelector sortName={sortName} setSortName={setSortName} />
      {/* <div className="wraaper-sortButton">
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
      </div> */}
    </div>
  );
}
