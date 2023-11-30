import "./Select2.scss";

const Select2 = ({
  className,
  value,
  onChange,
  optionData,
  optionFunction,
}) => {
  return (
    <select
      className={`select2 select ${className}`}
      value={value}
      onChange={onChange}
    >
      {optionFunction(optionData)}
    </select>
  );
};

export default Select2;
