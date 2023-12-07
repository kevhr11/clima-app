import React from "react";
import imagenDia from "../img/dia.jpg";
import imagenNoche from "../img/noche.jpg";
import ubicacion from "../img/ubicacion.svg";
import temperatura from "../img/temperatura.svg";
import viento from "../img/viento.svg";
import humedad from "../img/humedad.svg";
import temperaturaMaxima from "../img/temperatura-maxima.svg";
import temperaturaMinima from "../img/temperatura-minima.svg";
import "../hojasDeEstilo/CardDiaActual.css";

function CardDiaActual({ climaActual }) {
  const fechaActual = new Date();
  const horaNoche = 18;
  return (
    <div
      className="dia-actual"
      style={{
        backgroundImage: `url(${
          fechaActual.getHours() >= 6 && fechaActual.getHours() < horaNoche
            ? imagenDia
            : imagenNoche
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color:
          fechaActual.getHours() >= 6 && fechaActual.getHours() < horaNoche
            ? "black"
            : "white",
      }}
    >
      <div>
        <div className="pais">
          <img
            src={ubicacion}
            alt="Ubicacion"
            title="Ubicacion"
            style={{
              filter: `${
                fechaActual.getHours() >= 6 &&
                fechaActual.getHours() < horaNoche
                  ? ""
                  : "invert(1)"
              }`,
            }}
          />
          <span className="pais-nombre">{climaActual[0].name}</span>
        </div>
        <p className="descripcion">{climaActual[0].weather[0].description}</p>
      </div>
      {/* <p>Longitud: {climaActual[0].coord.lon}</p>
      <p>Latitud: {climaActual[0].coord.lat}</p> */}
      {/* <p>Main: {climaActual[0].weather[0].main}</p> */}
      <img
        className="imagen"
        src={`https://openweathermap.org/img/w/${climaActual[0].weather[0].icon}.png`}
        alt="Clima icon"
      />
      <div className="datos">
        <p className="temperatura">{Math.round(climaActual[0].main.temp)} °C</p>
        <div className="datos-adicionales">
          <div className="datos-temperatura">
            <div className="temp-maxima-container">
              <img
                src={temperaturaMaxima}
                alt="Temperatura Maxima"
                className="datosAdicionalesImg"
                title="Temperatura Maxima"
                style={{
                  filter: `${
                    fechaActual.getHours() >= 6 &&
                    fechaActual.getHours() < horaNoche
                      ? ""
                      : "invert(1)"
                  }`,
                }}
              />
              <p>: {Math.round(climaActual[0].main.temp_max)} °C</p>
            </div>
            <div className="temp-minima-container">
              <img
                src={temperaturaMinima}
                alt="Temperatura Minima"
                className="datosAdicionalesImg"
                title="Temperatura Minima"
                style={{
                  filter: `${
                    fechaActual.getHours() >= 6 &&
                    fechaActual.getHours() < horaNoche
                      ? ""
                      : "invert(1)"
                  }`,
                }}
              />
              <p>: {Math.round(climaActual[0].main.temp_min)} °C</p>
            </div>
          </div>
          <div className="otros-datos">
            <div className="humedad-container">
              <img
                src={humedad}
                alt="Humedad"
                className="datosAdicionalesImg"
                title="Humedad"
                style={{
                  filter: `${
                    fechaActual.getHours() >= 6 &&
                    fechaActual.getHours() < horaNoche
                      ? ""
                      : "invert(1)"
                  }`,
                }}
              />
              <p>: {climaActual[0].main.humidity}</p>
            </div>
            <div className="viento-container">
              <img
                src={viento}
                alt="Velocidad del viento"
                className="datosAdicionalesImg"
                title="Velocidad del viento"
                style={{
                  filter: `${
                    fechaActual.getHours() >= 6 &&
                    fechaActual.getHours() < horaNoche
                      ? ""
                      : "invert(1)"
                  }`,
                }}
              />
              <p>: {climaActual[0].wind.speed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDiaActual;
