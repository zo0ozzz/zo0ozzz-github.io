import "./SortingSelector.scss";
import { useState, useEffect } from "react";
import Label1 from "../label/Label1";
import Select1 from "../select1/Select1";

export default function SortingSelector({ sortName, setSortName }) {
  const [selectValue, setSelectValue] = useState("");
  =

  const sortingSelectorData = {
    label: { name: "정렬:", htmlFor: "" },
    select: {
      value: selectValue,
      onChange: handleChangeSelect,
      id: "",
      option: optionData,
    },
  };

  function handleChangeSelect(e) {
    const sortName = e.target.value;

    setSortName(sortName);
  }

  useEffect(() => {
    setSelectValue(sortName);
  }, [sortName]);

  return (
    <span className="sortingSelector">
      <Label1 data={sortingSelectorData.label} />
      <Select1 data={sortingSelectorData.select} />

      {/* <label htmlFor="sort">정렬:</label>
        <select
          name=""
          id="sort"
          value={selectValue}
          onChange={handleChangeSelect}
        >
          <option value="최신순">최신순</option>
          <option value="오래된 순">오래된 순</option>
        </select> */}
    </span>
  );
}
