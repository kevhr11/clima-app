import React from "react";
import "../hojasDeEstilo/ListaDias.css";

import viento from "../img/viento.svg";
import humedad from "../img/humedad.svg";
import temperaturaMaxima from "../img/temperatura-maxima.svg";
import temperaturaMinima from "../img/temperatura-minima.svg";

function ListaDias({ el, diaNoche }) {
  const horaDia = new Date(); //Obtener fecha y hora actual
  const nochehora = diaNoche; //Hora 6 pm

  /* Obtener el nombre del dia en base a la fecha ingresada */
  const obtenerDia = (fecha) => {
    const opciones = { weekday: "long" };
    const fechaObj = new Date(fecha);
    const nombreDia = fechaObj.toLocaleDateString("es-ES", opciones);

    return nombreDia;
  };

  return (
    /* Div padre que contiene la información de el clima de los proximos 5 días */
    <div className="clima-5-dias">
      {/* Texo de los próximos 5 dias */}
      <div className="texto-dias">
        <p>Clima durante los próximos 5 días</p>
      </div>
      {/* Div contiene las card con la información de los proximos 5 días */}
      <div
        className="dias-clima"
        style={{
          borderColor: `${
            horaDia.getHours() >= 6 && horaDia.getHours() < nochehora
              ? ""
              : "white"
          }`,
        }}
      >
        {el &&
          /* Iterar la lista de los próximos 5 días */
          el.list.map((item, index) => (
            /* Div padre que contiene toda la información de cada día */
            <div
              className="dia"
              key={index}
              style={{
                borderColor: `${
                  horaDia.getHours() >= 6 && horaDia.getHours() < nochehora
                    ? ""
                    : "white"
                }`,
              }}
            >
              {/* Div contiene el nombre del día, la descripción, icono y temperatura del dia */}
              <div className="datos-principales-container">
                <p className="nombre-dia">
                  {/* Mostrar nombre del día */}
                  {obtenerDia(item.dt_txt)}
                </p>
                {/* Descripción del clima para cada día */}
                <p className="descripcion-clima">{item.weather[0].description}</p>
                {/* Icono del estado del clima para cada día */}
                <img
                  src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt="Clima icon"
                />
                {/* Temperatura del clima para cada día */}
                <p className="temperatura-dias">
                  {Math.round(item.main.temp)} °C
                </p>
              </div>

              <div className="datos-adicionales-container">
                <div className="temperatura-min-max-container">
                  {/* Div que contien el icono de la temperatura maxima y la información */}
                  <div className="container-datos">
                    {/* Icono para la temperatura maxima */}
                    <img
                      src={temperaturaMaxima}
                      alt="Temperatura Maxima"
                      style={{
                        filter: `${
                          horaDia.getHours() >= 6 &&
                          horaDia.getHours() < nochehora
                            ? ""
                            : "invert(1)"
                        }`,
                      }}
                    />
                    {/* Información de la temperatura maxima */}:
                    <p>{Math.round(item.main.temp_max)} °C</p>
                  </div>
                  {/* Div que contien el icono de la temperatura minima y la información */}
                  <div className="container-datos">
                    {/* Icono para la temperatura minima */}
                    <img
                      src={temperaturaMinima}
                      alt="Temperatura Minima"
                      style={{
                        filter: `${
                          horaDia.getHours() >= 6 &&
                          horaDia.getHours() < nochehora
                            ? ""
                            : "invert(1)"
                        }`,
                      }}
                    />
                    {/* Información de la temperatura minima */}:
                    <p>{Math.round(item.main.temp_min)} °C</p>
                  </div>
                </div>

                <div className="humedad-viento-container">
                  {/* Div que contien el icono de la humedad y la información */}
                  <div className="container-datos">
                    {/* Icono para la humedad */}
                    <img
                      src={humedad}
                      alt="Humedad"
                      style={{
                        filter: `${
                          horaDia.getHours() >= 6 &&
                          horaDia.getHours() < nochehora
                            ? ""
                            : "invert(1)"
                        }`,
                      }}
                    />
                    {/* Información para la humedad */}:
                    <p className="humedad">{item.main.humidity} %</p>
                  </div>
                  {/* Div que contien el icono de la velocidad del viento y la información */}
                  <div className="container-datos">
                    {/* Icono para la velocidad del viento */}
                    <img
                      src={viento}
                      alt="Velocidad del viento"
                      style={{
                        filter: `${
                          horaDia.getHours() >= 6 &&
                          horaDia.getHours() < nochehora
                            ? ""
                            : "invert(1)"
                        }`,
                      }}
                    />
                    {/* Información de la velocidad del viento */}:
                    <p>{item.wind.speed} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListaDias;
