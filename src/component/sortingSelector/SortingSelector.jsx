import "./SortingSelector.scss";
import { useState, useEffect } from "react";
import Label2 from "../label2/Label2";
import Select2 from "../select2/Select2";

const SortingSelector = ({
  sortingMedthodData,
  selectedSortingMedthod,
  setSelectedSortingMedthod,
}) => {
  const [selectValue, setSelectValue] = useState("");
  const selectId = "select";

  // useEffect
  useEffect(() => {
    setSelectValue(selectedSortingMedthod);
  }, [selectedSortingMedthod]);

  // handler function
  function handleChangeSelect(e) {
    const sortingMedthod = e.target.value;

    setSelectedSortingMedthod(sortingMedthod);
  }

  // component props
  const optionFunction = (data) =>
    data.map((item) => <option vlaue={item.name}>{item.name}</option>);

  return (
    <span className="sortingSelector">
      <Label2
        className="sortingSelector__label"
        name="정렬:"
        htmlFor={selectId}
      />
      <Select2
        className="sortingSelector__select"
        value={selectValue}
        onChange={handleChangeSelect}
        id={selectId}
        optionData={sortingMedthodData}
        optionFunction={optionFunction}
      />
    </span>
  );
};

export default SortingSelector;
