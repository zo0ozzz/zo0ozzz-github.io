import "./Li.scss";

export default function Li({ data }) {
  const { className = "", name = "" } = data;

  return (
    <>
      <li className={`li1 li ${className}`}>{name}</li>
    </>
  );
}
