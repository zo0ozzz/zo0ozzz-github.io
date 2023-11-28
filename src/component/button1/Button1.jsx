import "./Button1.scss";

export default function Button1({ data }) {
  const {
    className = "",
    type = "button",
    name = "",
    onClick = () => {},
    disabled = false,
  } = data;

  return (
    <button
      className={`button1 button ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
