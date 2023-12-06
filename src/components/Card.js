import React from "react";
import CardDiaActual from "./CardDiaActual";
import ListaDias from "./ListaDias";

function Card({ el, climaActual }) {
  return (
    <div className="card">
      <CardDiaActual climaActual={climaActual} />
      <ListaDias el={el} />
    </div>
  );
}

export default Card;
