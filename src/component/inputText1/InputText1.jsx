import "./InputText1.scss";
import { forwardRef } from "react";

const InputText1 = forwardRef(({ data }, ref = null) => {
  const {
    className = "",
    value = "",
    defaultValue = "",
    onChange = () => {},
    onKeyDown = () => {},
    id = "",
    autoComplete = "off",
    placeholder = "",
  } = data;

  return (
    <input
      type="text"
      className={`inputText1 textInput ${className}`}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      id={id}
      autoComplete={autoComplete}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

export default InputText1;
