import { forwardRef } from "react";
import "./ButtonRef1.scss";

const ButtonRef = forwardRef(
  ({ className, name, onClick, disabled = false, key }, ref) => {
    return (
      <button
        className={`buttonRef button ${className}`}
        onClick={onClick}
        disabled={disabled}
        key={key}
        ref={ref}
      >
        {name}
      </button>
    );
  }
);

export default ButtonRef;
