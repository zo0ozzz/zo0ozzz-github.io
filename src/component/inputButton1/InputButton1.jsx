import "./InputButton1.scss";

export default function InputButton1({ data }) {
  const inputButton1 = (
    <input
      className="inputButton1-input"
      type={data.type}
      value={data.value}
      onClick={data.onClick}
    />
  );

  return <span className="inputButton1">{inputButton1}</span>;
}
