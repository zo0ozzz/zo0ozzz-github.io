import "./Searcher.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputButton1 from "../inputButton1/InputButton1";
import InputText1 from "../inputText1/InputText1";
import Label1 from "../label/Label1";

export default function () {
  const navigate = useNavigate();

  const [textInputValue, settextInputValue] = useState("");

  const searcherData = {
    label: {
      name: "검색:",
      htmlFor: "searchTextInput",
      className: "searcher__label",
    },
    textInput: {
      type: "text",
      id: "searchTextInput",
      autoComplete: "off",
      value: textInputValue,
      onChange: handleChangeTextInput,
      className: "searcher__textInput",
    },
    submitInput: {
      type: "submit",
      value: "확인",
      onClick: handleClickSubmitInput,
      className: "searcher__submitButton",
    },
  };

  function handleChangeTextInput(e) {
    const value = e.target.value;

    settextInputValue(value);
  }

  function handleClickSubmitInput(e) {
    e.preventDefault();

    if (textInputValue === "") {
      alert("검색어를 입력해주세요.");

      return;
    }

    navigate("/search?searchString=" + textInputValue);
  }

  return (
    <>
      <div className="searcher">
        <Label1 data={searcherData.label} />
        <InputText1 data={searcherData.textInput} ref={null} />
        <InputButton1 data={searcherData.submitInput} />
      </div>
    </>
  );
}
