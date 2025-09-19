import React from "react";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 16px",
        fontSize: "18px",
        cursor: "pointer",
      }}
    >

      +
    </button>
  );
};

export default Button;
