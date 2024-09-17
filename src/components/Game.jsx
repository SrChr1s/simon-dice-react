import { useState, useEffect } from "react";
import Boton from "./Boton";
import Lost from "./Lost";
import Ajustes from "./Ajustes";

function SimonDice() {
  const [playing, setPlaying] = useState(false);
  const [playColors, setPlayColors] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [flash, setFlash] = useState("");
  const [userTurn, setUserTurn] = useState(false);
  const [userColors, setUserColors] = useState([]);
  const [lost, setLost] = useState(false);
  const [settings, setSettings] = useState(false);
  const [dificulty, setDificulty] = useState(400);
  const [difSelected, setDifSelected] = useState("easy");

  const colores = ["yellow", "blue", "red", "green"];

  const radios = ["100% 0 0 0", "0 100% 0 0", "0 0 0 100%", "0 0 100% 0"];

  const handleStartGame = () => {
    /* Establezco los valores inciales para un nuevo juego */
    if (!playing) {
      setPlaying(true);
      setPuntos(0);
      setUserTurn(false);
      setUserColors([]);
      setPlayColors([]);
    }
  };

  const handleCloseLost = () => {
    /* Cuando se cierra la ventana de '¡Has Perdido!' reinicio los estados necesarios para permitir iniciar un nuevo juego */
    setLost(false);
    setPlaying(false);
    setUserTurn(false);
  };

  const handleRetry = () => {
    /* Al darle a reintentar se inicia un nuevo juego automaticamente con la misma dificultad con la que se jugó */
    setLost(false);
    setUserTurn(false);
    setUserColors([]);
    setPlayColors([]);
    setPuntos(0);
  };

  const handleOptions = () => {
    /* Manejo del menu de opciones, revisa si lo está mostrando para alternar entre que esté visible o no */
    if (!playing) settings ? setSettings(false) : setSettings(true);
  };

  const handleUserTurn = async (c) => {
    /* Permito al usuario la interacción con los botones siempre y cuando sea su turno y no haya perdido */
    if (userTurn && !lost) {
      /* Obtengo los colores de la secuencia generada aleatoriamente */
      const userTry = [...userColors];
      /* Separo el primer color */
      const lastColor = userTry.shift();
      /* Muestro la interacción del usuario con el botón escogido iluminandolo y reproduciendo un sonido */
      setFlash(c);
      Sonidos(c);
      /* Si el color presionado es igual al primer color de la secuencia sigo jugando */
      if (c == lastColor) {
        /* Verifico que la secuencia tenga más colores por validar */
        if (userTry.length) {
          /* De ser así guardo el nuevo array con un color menos (el que acaba de validarse) */
          setUserColors(userTry);
        } else {
          /* Si no, quiere decir que es el ultimo de la secuencia y por tanto terminó ese nivel exitosamente
            estableciendo que un nuevo nivel debe jugarse y por tanto ya no es turno del usuario, (se actualiza el estado Playing, dependiente del useEffect) */
          await Sleep(300);
          setFlash("");
          setPuntos(playColors.length);
          setUserColors([]);
          setPlaying(true);
          setUserTurn(false);
        }
      } else {
        /* Si no es igual, reestablezco la iluminación original del botón y seteo como perdida la partida */
        setFlash("");
        setLost(true);
      }
      await Sleep(300);
      setFlash("");
    }
  };

  useEffect(() => {
    /* Si el juego ha comenzado y no es turno del usuario comienzo con la generación de la secuencia de colores en forma aleatoria */
    if (playing && !userTurn) {
      const randomColor = colores[Math.floor(Math.random() * 4)];
      /* Guardo el color seleccionado al azar en el array de colores de la partida */
      playColors.push(randomColor);
      /* Ilumino los colores en la dificultad (velocidad) establecida */
      FlashingColor(dificulty);
    }
  }, [playing, userTurn]);

  /* Recorro todos los colores que se encuentren en el array de la partida para iluminarlos y hacerlos sonar, mostrando la secuencia */
  async function FlashingColor(d) {
    await Sleep(700);
    for (let i = 0; i < playColors.length; i++) {
      const e = playColors[i];
      Sonidos(e);
      setFlash(e);
      await Sleep(d);
      setFlash("");
      await Sleep(d);
    }
    /* Una vez finalizada la secuencia guardo los colores para luego compararlos con los que presione el usuario sin modificar la secuencia de la partida */
    setUserColors([...playColors]);
    setUserTurn(true);
  }

  return (
    <main className="app">
      <section className="game">
        {colores.map((c, i) => (
          <Boton
            key={i}
            bgColor={c}
            bdRadius={radios[i]}
            flash={flash == c}
            onClick={() => {
              handleUserTurn(c);
            }}
          />
        ))}

        <button
          className={`playButton ${!playing ? "offPlay" : ""}`}
          onClick={handleStartGame}
        >
          {!playing ? "Play" : puntos}
        </button>

        <Lost
          show={lost}
          score={puntos}
          retry={handleRetry}
          close={handleCloseLost}
        />
      </section>
      <div
        className={`ajustes ${playing ? "gaming" : ""}`}
        onClick={handleOptions}
      >
        <img id="engranaje" src="src/assets/engranaje64.png" />
      </div>
      <Ajustes
        show={settings}
        easy={() => (setDificulty(400), setDifSelected("easy"))}
        medium={() => (setDificulty(250), setDifSelected("medium"))}
        hard={() => (setDificulty(100), setDifSelected("hard"))}
        selected={difSelected}
      />
    </main>
  );
}

export default SimonDice;

function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Sonidos(c) {
  switch (c) {
    case "yellow":
      new Audio("src/sounds/simonSound1.mp3").play();
      break;
    case "blue":
      new Audio("src/sounds/simonSound2.mp3").play();
      break;
    case "red":
      new Audio("src/sounds/simonSound3.mp3").play();
      break;
    case "green":
      new Audio("src/sounds/simonSound4.mp3").play();
      break;
  }
}
