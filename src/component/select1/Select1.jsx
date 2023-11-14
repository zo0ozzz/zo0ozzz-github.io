import "./Select1.scss";

export default function Select1({ data }) {
  const {
    value = [],
    onChange = () => {},

    elementId = "",
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
    <span className="select1">
      <select name="" id={elementId} value={value} onChange={onChange}>
        {options}
      </select>
    </span>
  );
}
