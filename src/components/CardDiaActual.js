import React from "react";
import imagenDia from "../img/dia.jpg";
import imagenNoche from "../img/noche.jpg";
import ubicacion from "../img/ubicacion.svg";
import viento from "../img/viento.svg";
import humedad from "../img/humedad.svg";
import temperaturaMaxima from "../img/temperatura-maxima.svg";
import temperaturaMinima from "../img/temperatura-minima.svg";
import "../hojasDeEstilo/CardDiaActual.css";

//Componente CardDiaActual donde se muestra la información del pronostico del día actual
function CardDiaActual({ climaActual, diaNoche }) {
  //Se crean las constantes para la fecha y hora actuales y una constante para especificar la hora en la que inicia la noche
  const fechaActual = new Date();
  const horaNoche = diaNoche;
  return (
    /* Div principal el que contiene la imagen de fondo si son las 6 am en adelante se usa la imagen de fondo de las nubes y si son las 6 pm en adelante la de la luna y las estrellas */
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
      {/* Este div muesta la ubicacion, el nombre del pais y la descripcion del clima */}
      <div>
        {/* Este div contiene el icono del pais y el nombre */}
        <div className="pais">
          {/* Icono svg de ubicacion cuando la hora es mayor a las 6 am el color del icono sera negro y si son las 6 pm en adelante el color sera blanco */}
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
          {/* En esta etique span de almacena el nombre del pais */}
          <span className="pais-nombre">{climaActual[0].name}</span>
        </div>
        {/* En esta etiqueta p se almacena la descripcion del clima */}
        <p className="descripcion">{climaActual[0].weather[0].description}</p>
      </div>
      {/* Etiqueta img que contiene el icono segun el estado del clima */}
      <img
        className="imagen"
        src={`https://openweathermap.org/img/w/${climaActual[0].weather[0].icon}.png`}
        alt="Clima icon"
      />
      {/* En este div se almacenan todos los datos adicionales del clima actual por ejemplo la humedad, velocidad del viento, temperatura maxima y minima */}
      <div className="datos">
        {/* Etiqueta p que contiene la temperatura del dia actual */}
        <p className="temperatura">{Math.round(climaActual[0].main.temp)} °C</p>
        {/* Div padre que contiene los datos adicionales */}
        <div className="datos-adicionales">
          {/* Div que contiene la temperatura maxima y minima */}
          <div className="datos-temperatura">
            {/* Div que contiene el icono y la temperatura maxima */}
            <div className="temp-maxima-container">
              {/* Icono temperatura maxima */}
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
              {/* Dato de la temperatura maxima */}
              <p>: {Math.round(climaActual[0].main.temp_max)} °C</p>
            </div>
            {/* Div que contiene el icono y la temperatura minima */}
            <div className="temp-minima-container">
              {/* Icono temperatura minima */}
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
              {/* Dato de la temperatura minima */}
              <p>: {Math.round(climaActual[0].main.temp_min)} °C</p>
            </div>
          </div>
          {/* Div que contiene la humedad y la velocidad del viento */}
          <div className="otros-datos">
            {/* Div que contiene el icono de la humedad y el dato de la humedad */}
            <div className="humedad-container">
              {/* Icono de la humedad */}
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
              {/* Dato de la humedad */}
              <p>: {climaActual[0].main.humidity} %</p>
            </div>
            {/* Div que contiene el icono del vieto y el dato de la velocidad del viento */}
            <div className="viento-container">
              {/* Icono de la velocidad del viento */}
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
              {/* Dato de la velocidad del viento */}
              <p>: {climaActual[0].wind.speed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDiaActual;
