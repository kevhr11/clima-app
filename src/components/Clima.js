import { useEffect, useState } from "react";
import "../hojasDeEstilo/Clima.css";

import axios from "axios";
import Formulario from "./Formulario";
import Card from "./Card";

function Clima() {
  const [climaActual, setClimaActual] = useState("");
  const [clima, setClima] = useState("");
  const [errorCiudad, setErrorCiudad] = useState("");

  // Crear un nuevo objeto Date, que representa la fecha y hora actuales
  const fechaActual = new Date();
  const fechaActual2 = new Date();


  /* Sumar 2 horas a la variable fechaActual2 */
  fechaActual2.setHours(fechaActual.getHours() + 2);

  const filtrarClima = (data) => {
    const climaFiltrado = data.list.filter((el) => {
      const horaPeticion = new Date(el.dt_txt).getHours();

      if (
        horaPeticion >= fechaActual.getHours() &&
        horaPeticion <= fechaActual2.getHours() &&
        fechaActual2.getHours() <= 21
      ) {
        return true;
      }
      return false;
    });
    return climaFiltrado;
  };

  /*----------------------------------Obtener el clima al iniciar la aplicacion con la longitud y la latitud------------------------------------------*/
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitud = position.coords.latitude;
        let longitud = position.coords.longitude;

        const fetchData = async () => {
          try {
            /*-----------------------------------------------Peticion a la API para el dia actual---------------------------------------------*/
            const urlDiaActual = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=53281710f25652ce45001bf17f0bd29b&lang=es`;
            const responseDiaActual = await axios.get(urlDiaActual);
            /*-------Agregar el nuevo resultado-----------*/
            setClimaActual([{ ...responseDiaActual.data }]);

            /* ----------------------------------------Peticion a la API para 5 dias---------------------------------------------------*/
            const urlDias = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&units=metric&appid=53281710f25652ce45001bf17f0bd29b&lang=es`;
            const responseDias = await axios.get(urlDias);
            /* Filtrar los datos en base a la hora */
            const climaData = filtrarClima(responseDias.data);
            // Limpiar el estado antes de agregar el nuevo resultado
            setClima([{ ...responseDias.data, list: climaData }]);
          } catch (error) {
            console.error("Error al obtener los datos:", error);
          }
        };

        fetchData();
      },
      function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("El usuario denegó la solicitud de geolocalización.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("La información de ubicación no está disponible.");
            break;
          case error.TIMEOUT:
            console.error(
              "Se agotó el tiempo de espera para obtener la ubicación."
            );
            break;
          case error.UNKNOWN_ERROR:
            console.error(
              "Ocurrió un error desconocido al obtener la ubicación."
            );
            break;
          default:
        }
      }
    );
  }, []);


  /*----------------------------------------Obtener el clima por ciudad----------------------------------------------------*/
  const mostrarClima = (ciudad) => {
    setErrorCiudad("");
    if (ciudad) {
      const getData = async () => {
        try {
          /* Peticion a la API para el dia actual*/
          const urlDiaActual = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=53281710f25652ce45001bf17f0bd29b&lang=es`;
          const responseDiaActual = await axios.get(urlDiaActual);
          // Limpiar el estado antes de agregar el nuevo resultado
          setClimaActual([{ ...responseDiaActual.data }]);

          /* Peticion a la API para 5 dias*/
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=metric&appid=53281710f25652ce45001bf17f0bd29b&lang=es`
          );
          const climaFiltrado = filtrarClima(response.data);
          console.log(climaFiltrado);
          // Limpiar el estado antes de agregar el nuevo resultado
          setClima([{ ...response.data, list: climaFiltrado }]);
        } catch (error) {
          // Manejar el error aquí
          console.error("Error al obtener datos:", error);
          setErrorCiudad("El país seleccionado no existe verifique si esta bien escrito o si son dos palabras no pueden estar unidas.");
        }
      };

      getData();
    } else {
      console.log("Por favor, proporciona la ciudad o la latitud y longitud.");
    }
  };

  return (
    <div className="contenedor-principal">
      {!errorCiudad ? "" : <div className="error-pais">{errorCiudad}</div>}
      <Formulario mostrarClima={mostrarClima} />

      {climaActual && <Card  el={clima[0]} climaActual={climaActual} />}
      {/* {
        clima.map((el, index) => (
        <Card key={index} el={el} climaActual={climaActual} />
      ))} */}
    </div>
  );
}

export default Clima;