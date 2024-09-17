import React from "react";

function Ajustes({ show, easy, medium, hard, selected }) {
  return (
    <div className={`settings ${show ? "show" : ""}`}>
      <h1>Dificultad</h1>
      <div className="dificultades">
        <button
          className={`easy ${selected == "easy" ? "selected" : ""}`}
          onClick={easy}
        >
          Fácil
        </button>
        <button
          className={`medium ${selected == "medium" ? "selected" : ""}`}
          onClick={medium}
        >
          Medio
        </button>
        <button
          className={`hard ${selected == "hard" ? "selected" : ""}`}
          onClick={hard}
        >
          Difícil
        </button>
      </div>
    </div>
  );
}

export default Ajustes;
