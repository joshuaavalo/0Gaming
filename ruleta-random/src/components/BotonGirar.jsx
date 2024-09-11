import React from "react";


const BotonGirar = ({ girando, girarRuleta }) => {
  return (
    <button id="girar" onClick={girarRuleta} disabled={girando}>
      Girar Ruleta
      
    </button>
    
  );
};

export default BotonGirar;
