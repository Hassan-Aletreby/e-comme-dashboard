import React from "react";
const Input = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  textarea = false,
}) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
