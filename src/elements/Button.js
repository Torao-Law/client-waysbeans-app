import React from "react";

function Button(props) {
  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <button
      className={props.className}
      type={props.type}
      onClick={onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

export default Button;
