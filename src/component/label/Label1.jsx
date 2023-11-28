import "./Label1.scss";

export default function Label1({ data }) {
  const { name = "", htmlFor = "", className = "" } = data;

  return (
    <label className={`label1 label ${className}`} htmlFor={htmlFor}>
      {name}
    </label>
  );
}
