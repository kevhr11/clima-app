import React from "react";
import "../hojasDeEstilo/ListaDias.css";

import temperatura from "../img/temperatura.svg";
import viento from "../img/viento.svg";
import humedad from "../img/humedad.svg";
import temperaturaMaxima from "../img/temperatura-maxima.svg";
import temperaturaMinima from "../img/temperatura-minima.svg";

function ListaDias({ el }) {
  console.log(el);

  return (
    <div className="clima-5-dias">
      <div className="texto-dias">
        <p>Clima durante los proximos 5 dias</p>
      </div>
      <div className="dias-clima">
        {el.list.map((item, index) => (
          <div className="dia" key={index}>
            <p>{item.dt_txt.split(" ")[0]}</p>
            <p>{item.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt="Clima icon"
            />
            <p>{item.main.temp} °C</p>
            <div className="container-datos">
              <img src={humedad} alt="Humedad" />:<p>{item.main.humidity}</p>
            </div>
            <div className="container-datos">
              <img src={temperaturaMaxima} alt="Temperatura Maxima" />:
              <p>{item.main.temp_max} °C</p>
            </div>
            <div className="container-datos">
              <img src={temperaturaMinima} alt="Temperatura Minima" />:
              <p>{item.main.temp_min} °C</p>
            </div>
            <div className="container-datos">
              <img src={viento} alt="Velocidad del viento" />:
              <p>{item.wind.speed} km/h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaDias;
