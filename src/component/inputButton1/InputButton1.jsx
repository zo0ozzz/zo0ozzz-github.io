import "./InputButton1.scss";

export default function InputButton1({ data }) {
  const { type = "submit", value = "견본", onClick = () => {} } = data;

  return (
    <span className="inputButton1">
      <input
        className="inputButton1-input"
        type={type}
        value={value}
        onClick={onClick}
      />
    </span>
  );
}
