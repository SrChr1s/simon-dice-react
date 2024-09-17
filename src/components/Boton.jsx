import React from "react";

function Boton({ bgColor, bdRadius, flash, onClick }) {
  return (
    <button
      className={`gameButton ${bgColor} ${flash ? "flash" : ""}`}
      style={{ borderRadius: bdRadius }}
      onClick={onClick}
    />
  );
}

export default Boton;
