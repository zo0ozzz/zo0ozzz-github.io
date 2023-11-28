import "./SortingSelector.scss";
import { useState, useEffect } from "react";
import Label1 from "../label/Label1";
import Select1 from "../select1/Select1";

export default function SortingSelector({
  sortingMedthodData,
  selectedSortingMedthod,
  setSelectedSortingMedthod,
}) {
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setSelectValue(selectedSortingMedthod);
  }, [selectedSortingMedthod]);

  function handleChangeSelect(e) {
    const sortingMedthod = e.target.value;

    setSelectedSortingMedthod(sortingMedthod);
  }

  const selectId = "select";

  const sortingSelectorData = {
    label: {
      name: "정렬:",
      htmlFor: selectId,
      className: "sortingSelector__label",
    },
    select: {
      value: selectValue,
      onChange: handleChangeSelect,
      id: selectId,
      option: sortingMedthodData,
      className: "sortingSelector__select",
    },
  };

  return (
    <span className="sortingSelector">
      <Label1 data={sortingSelectorData.label} />
      <Select1 data={sortingSelectorData.select} />
    </span>
  );
}
