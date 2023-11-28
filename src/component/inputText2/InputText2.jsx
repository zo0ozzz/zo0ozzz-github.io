import "./InputText2.scss";
import { forwardRef } from "react";

const InputText2 = forwardRef(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      id,
      autoComplete,
      placeholder,
    },
    ref = null
  ) => {
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
  }
);

export default InputText2;
