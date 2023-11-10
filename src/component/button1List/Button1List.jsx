import "./Button1List.scss";

export default function Button1List({ data }) {
  const button1List = data.map(
    ({ name = "견본", onClick = () => {}, className = "" }, index) => (
      <button
        className={`button1List-button ${className}`}
        onClick={onClick}
        key={index}
      >
        {name}
      </button>
    )
  );

  return <div className="button1List">{button1List}</div>;
}
