import "./Select1.scss";

export default function Select1({ data }) {
  const {
    className = "",
    value = [],
    onChange = () => {},
    id = "",
    option = [{ id: "", value: "", name: "견본", className_option: "" }],
  } = data;

  const options = option.map(({ value, name, id }, index) => {
    return (
      <option value={value} key={id}>
        {name}
      </option>
    );
  });

  return (
    <select
      className={`select1 select ${className}`}
      name=""
      id={id}
      value={value}
      onChange={onChange}
    >
      {options}
    </select>
  );
}
