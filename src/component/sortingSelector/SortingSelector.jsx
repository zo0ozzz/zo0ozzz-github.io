import "./SortingSelector.scss";
import { useState, useEffect } from "react";

export default function SortingSelector ({ sortName, setSortName }) {
  const [selectValue, setSelectValue] = useState("");

	const sortingSelectorData = {
    label: { name: "정렬:", htmlFor: "" },
    selectInput: { value: selectValue, onChange: handleChangeSelect, id: '' },
  };

  function handleChangeSelect = (e) => {
    const sortName = e.target.value;

    setSortName(sortName);
  };

  useEffect(() => {
    setSelectValue(sortName);
  }, [sortName]);

  return (
    <span className="sortingSelector">
      {/* <form action=""> */}
				<Label1/>


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
      {/* </form> */}
    </span>
  );
}
