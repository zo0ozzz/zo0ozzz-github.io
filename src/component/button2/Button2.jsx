import "./Button2.scss";

export default function Button2({ className, name, onClick, key }) {
  return (
    <button className={`button ${className}`} onClick={onClick} key={key}>
      {name}
    </button>
  );
}
