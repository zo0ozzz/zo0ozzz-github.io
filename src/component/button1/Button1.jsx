import "./Button1.scss";

export default function Button1({ data }) {
  const {
    className = "",
    type = "button",
    name = "견본",
    onClick = () => {},
    disabled = false,
  } = data;

  return (
    <span className="button1">
      <button
        className={`button1-button ${className}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {name}
      </button>
    </span>
  );
}
