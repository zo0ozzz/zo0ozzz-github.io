import "./Select1.scss";

export default function Select1({ data }) {
  const { value = [], onChange = () => {}, id = "", option = [] } = data;

  const options = option.map(({ value, name }, index) => {
    return (
      <option value={value} key={index}>
        {name}
      </option>
    );
  });

  return (
    <span className="select1">
      <select name="" id="sort" value={value} onChange={onChange}>
        {options}
      </select>
    </span>
  );
}
