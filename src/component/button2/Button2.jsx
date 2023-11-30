import "./Button2.scss";

export default function Button2({
  className,
  name,
  onClick,
  disabled = false,
  key,
}) {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      key={key}
    >
      {name}
    </button>
  );
}
