import "./InputText1.scss";

export default function InputText1({ data }) {
  const {
    value = "견본",
    onChange = () => {},
    onKeyDown = () => {},
    id = "",
    autoComplete = "",
  } = data;

  return (
    <>
      <span className="inputText1">
        <input
          className="inputText1-input"
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          id={id}
          autoComplete={autoComplete}
        />
      </span>
    </>
  );
}
