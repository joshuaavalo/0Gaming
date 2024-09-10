import React, { useRef } from "react";


const Ruleta = ({ girarRuleta, generarNumeros, rotacionFinal }) => {
  const ruletaRef = useRef(null);

  return (
    <svg
      className="ruleta"
      viewBox="0 0 400 400"
      ref={ruletaRef}
      style={{ transform: `rotate(${rotacionFinal}deg)` }}
    >
      {generarNumeros()}
    </svg>
  );
};

export default Ruleta;
