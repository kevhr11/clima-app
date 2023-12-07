import React from "react";
import CardDiaActual from "./CardDiaActual";
import ListaDias from "./ListaDias";

function Card({ el, climaActual, diaNoche }) {
  //Retornar el componente Card con los componentes CardDiaActual y ListaDias
  return (
    <div className="card">
      <CardDiaActual climaActual={climaActual} diaNoche={diaNoche} />
      <ListaDias el={el} diaNoche={diaNoche} />
    </div>
  );
}

export default Card;
