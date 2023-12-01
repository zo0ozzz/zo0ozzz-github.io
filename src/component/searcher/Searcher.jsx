import "./Searcher.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Label2 from "../label2/Label2";
import InputText2 from "../inputText2/InputText2";
import ButtonRef from "../buttonWithRef/ButtonRef";

const Searcher = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchQueryTextInputId = "searchQueryTextInput";
  const searchQueryTextInputRef = useRef(null);
  const submitButton = useRef(null);

  // handler function
  const handleChangeSearchQueryTextInput = (e) => {
    const value = e.target.value;

    setSearchQuery(value);

    return;
  };

  const handleClickSubmitButton = () => {
    if (searchQuery === "") {
      alert("검색어를 입력해주세요.");

      return;
    }

    navigate("/search?searchQuery=" + searchQuery);
  };

  const handleKeyDownSearchQueryTextInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      submitButton.current.click();
    }
  };

  return (
    <div className="searcher">
      <Label2
        className="searcher__label"
        name="검색:"
        htmlFor={searchQueryTextInputId}
      />
      <InputText2
        className="searcher__searchQueryTextInput"
        value={searchQuery}
        onChange={handleChangeSearchQueryTextInput}
        onKeyDown={handleKeyDownSearchQueryTextInput}
        id={searchQueryTextInputId}
        ref={searchQueryTextInputRef}
      />
      <ButtonRef
        className="searcher__submitButton"
        name="확인"
        onClick={handleClickSubmitButton}
        ref={submitButton}
      />
    </div>
  );
};

export default Searcher;
