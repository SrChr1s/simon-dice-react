import React from "react";

function Lost({ show, score, retry, close }) {
  return (
    <div className={`lostGame ${show ? "show" : ""}`}>
      <h1>¡Has Perdido!</h1>
      <h2>Llegaste al nivel: {score}</h2>
      <div className="lostBotonera">
        <button className="lostButton" onClick={close}>
          Aceptar
        </button>
        <button className="lostButton retryButton" onClick={retry}>
          Reintentar
        </button>
      </div>
    </div>
  );
}

export default Lost;
