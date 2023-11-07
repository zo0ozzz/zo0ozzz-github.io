import "./Label1.scss";

export default function Label1({ data = {} }) {
  const { name = "", htmlFor = "" } = data;

  return (
    <>
      <span className="label1">
        <label className="label1-label" htmlFor={htmlFor}>
          {name}
        </label>
      </span>
    </>
  );
}
