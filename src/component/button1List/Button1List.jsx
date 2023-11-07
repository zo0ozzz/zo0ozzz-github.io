import "./Button1List.scss";

export default function Button1List({ data }) {
  const button1List = data.map(({ name, onClick }, index) => (
    <button className="button1List-button" onClick={onClick} key={index}>
      {name}
    </button>
  ));

  return <div className="button1List">{button1List}</div>;
}
