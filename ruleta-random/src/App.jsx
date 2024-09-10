import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Ruleta from "./components/Ruleta";

import Señalador from "./components/Señalador";
import BotonGirar from "./components/BotonGirar";

function App() {
  const [girando, setGirando] = useState(false);
  const [numeroFinal, setNumeroFinal] = useState(null);
  const [rotacionFinal, setRotacionFinal] = useState(0);
  const [resultado, setResultado] = useState("");

  const obtenerNumeroAleatorio = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await respuesta.json();
      return data.value;
    } catch (error) {
      console.error("Error al obtener el número:", error);
      return Math.floor(Math.random() * 100) + 1;
    }
  };

  const girarRuleta = async () => {
    setGirando(true);
    setResultado("");

    const numeroAleatorio = await obtenerNumeroAleatorio();
    setNumeroFinal(numeroAleatorio);

    const rotacion = 3600 + (360 / 100) * (100 - numeroAleatorio);
    setRotacionFinal(rotacion);

    setTimeout(() => {
      setResultado(`La ruleta se detuvo en: ${numeroAleatorio}`);
      setGirando(false);
    }, 5000);
  };

  const generarNumeros = () => {
    const radio = 150;
    const totalNumeros = 100;
    const numeros = [];

    for (let i = 1; i <= totalNumeros; i++) {
      const angle = (i / totalNumeros) * 2 * Math.PI;
      const x = 200 + radio * Math.cos(angle);
      const y = 200 + radio * Math.sin(angle);

      numeros.push(
        <text
          key={i}
          x={x}
          y={y}
          className={`numero ${i % 2 === 0 ? "rojo" : "negro"}`}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${(i * 360) / totalNumeros} ${x} ${y})`}
        >
          {i}
        </text>
      );
    }
    return numeros;
  };

  return (
    <div className="ruleta-container">
      
      
      <Ruleta generarNumeros={generarNumeros} rotacionFinal={rotacionFinal} />
      
      <Señalador />
      <BotonGirar girando={girando} girarRuleta={girarRuleta} />
      <div id="resultado">{resultado && `La ruleta se detuvo en: ${numeroFinal}`}</div>
    </div>
  );
}

export default App;
