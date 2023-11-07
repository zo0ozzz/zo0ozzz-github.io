import "./Select1.scss";

export default function Select1({ data }) {
  const { value = "견본", onChange = () => {}, id = "" } = data;

  return (
    <span className="Select1">
      <select
        name=""
        id="sort"
        value={selectValue}
        onChange={handleChangeSelect}
      >
        <option value="최신순">최신순</option>
        <option value="오래된 순">오래된 순</option>
      </select>
    </span>
  );
}
