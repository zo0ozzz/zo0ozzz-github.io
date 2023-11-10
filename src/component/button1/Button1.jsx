import "./Button1.scss";

export default function Button1({ data }) {
  const {
    className = "",
    type = "button",
    name = "견본",
    onClick = () => {},
  } = data;

  return (
    <span className="button1">
      <button
        className={`button1-button ${className}`}
        type={type}
        onClick={onClick}
      >
        {name}
      </button>
    </span>
  );
}
