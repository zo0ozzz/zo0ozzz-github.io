import "./Searcher.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputButton1 from "../inputButton1/InputButton1";

export default function () {
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState("");

  const searcherData = {
    label: { name: "검색: ", htmlFor: this.textInput.id },
    inputText: {
      type: "text",
      id: "searchTextInput",
      autoComplete: "off",
      value: searchInputValue,
      onChange: handleChangeSearchInput,
    },
    inputSubmit: {
      type: "submit",
      value: "확인",
      onClick: handleClickSearchButton,
    },
  };

  const handleChangeSearchInput = (e) => {
    const value = e.target.value;

    setSearchInputValue(value);
  };

  const handleClickSearchButton = (e) => {
    e.preventDefault();

    navigate("/search?searchString=" + searchInputValue);
  };

  return (
    <>
      <div className="searcher">
        <form action="">
          <label htmlFor={searcherData.label.name.htmlFor}>
            {searcherData.label.name}
          </label>
          <input
            type={searcherData.inputText.type}
            id={searcherData.inputText.id}
            autoComplete={searcherData.inputText.autoComplete}
            value={searcherData.inputText.value}
            onChange={searcherData.inputText.onChange}
          />
          <InputButton1 data={searcherData.inputSubmit} />
        </form>
      </div>
    </>
  );
}
