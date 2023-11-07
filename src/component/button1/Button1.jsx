import "./Button1.scss";

export default function Button1({ data }) {
  const { type, name, onClick } = data;
  const button1 = (
    <button className="button1-button" type={type} onClick={onClick}>
      {name}
    </button>
  );

  return <span className="button1">{button1}</span>;
}
