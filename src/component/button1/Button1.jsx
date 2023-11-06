import "./Button1.scss";

export default function Button1({ name, onClick }) {
  return (
    <>
      <button className="button1" onClick={onClick}>
        {name}
      </button>
    </>
  );
}
