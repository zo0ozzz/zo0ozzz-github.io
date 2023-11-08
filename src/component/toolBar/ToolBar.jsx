import "./ToolBar.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Searcher from "../searcher/Searcher";
import SortingSelector from "../sortingSelector/SortingSelector";

export default function ToolBar({ sortName, setSortName }) {
  const navigate = useNavigate();

  // const handleClickSearchButton = (e) => {
  //   e.preventDefault();

  //   navigate("/search?searchString=" + searchInputValue);
  // };

  // const handleChangeSearchInput = (e) => {
  //   const value = e.target.value;

  //   setSearchInputValue(value);
  // };

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
    </div>
  );
}
