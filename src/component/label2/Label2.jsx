import "./Label2.scss";

const Label2 = ({ className, name, htmlFor }) => {
  return (
    <label className={`label2 label ${className}`} htmlFor={htmlFor}>
      {name}
    </label>
  );
};

export default Label2;
