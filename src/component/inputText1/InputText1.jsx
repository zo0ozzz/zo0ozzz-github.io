import "./InputText1.scss";

export default function InputText1({ data }) {
  const {
    value = "견본",
    onChange = () => {},
    id = "",
    autoComplete = false,
  } = data;

  return (
    <>
      <span className="inputText1">
        <input
          className="inputText1-input"
          type="text"
          value={value}
          onChange={onChange}
          id={id}
          autoComplete={autoComplete}
        />
      </span>
    </>
  );
}
