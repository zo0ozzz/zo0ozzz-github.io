import "./InputText1.scss";
import { forwardRef } from "react";

const InputText1 = forwardRef(({ data }, ref = null) => {
  const {
    value = "",
    defaultValue = "",
    onChange = () => {},
    onKeyDown = () => {},
    id = "",
    autoComplete = "off",
    placehorder = "",
  } = data;

  return (
    <>
      <span className="inputText1">
        <input
          className="inputText1-input"
          type="text"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          id={id}
          autoComplete={autoComplete}
          placeholder={placehorder}
          ref={ref}
        />
      </span>
    </>
  );
});

export default InputText1;
