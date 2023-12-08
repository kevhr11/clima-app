import { useCallback, useEffect, useState } from "react";
import "../hojasDeEstilo/Clima.css";


import axios from "axios";
import Formulario from "./Formulario";
import Card from "./Card";

// Crear un nuevo objeto Date, que representa la fecha y hora actuales
const fechaActual = new Date(); //Esta constante almacena la fecha y hora actual
const fechaActual2 = new Date(); //Esta constante almacena la fecha y hora actual a la cual se le sumaran dos hora de la hora actual

const filtrarClima = (data) => {
  //Filtrar todos los datos para obtener un dato por dia en base a la hora del dia actual
  const climaFiltrado = data.list.filter((el) => {
    const horaPeticion = new Date(el.dt_txt).getHours();

    //Comparar en un rango si la hora que viene en la peticion es mayor a la hora actual y si es menor a la hora que se le suman 2 horas 
    if (
      horaPeticion >= fechaActual.getHours() &&
      horaPeticion <= fechaActual2.getHours()
    ) {
      return true;
    }
    return false;
  });
  return climaFiltrado;
};

function Clima() {
  const apiKey = process.env.REACT_APP_API_KEY;
  //Declaracion de estados
  const [climaActual, setClimaActual] = useState(""); //Almacena el clima del día actual
  const [clima, setClima] = useState(""); //Almacena el clima de los proximos 5 días
  const [errorCiudad, setErrorCiudad] = useState(""); //Almacena los errores si el país no existe en el servidor o si el país tiene 2 palabras no deben ir unidas
  const [errorPermisoUbicacion, setErrorPermisoUbicacion] = useState("")

  const diaNoche = 18;

  // Verifica la condición y aplica el color de fondo y la clase
  if (fechaActual.getHours() >= 6 && fechaActual.getHours() <= diaNoche) {
    // Si la condición es verdadera, agrega la clase para el degradado de fondo de dia y quita el de la noche
    document.body.classList.add("fondo-dia");
    document.body.classList.remove("fondo-noche");
  } else {
    // Si la condición es verdadera, agrega la clase para el degradado de fondo de noche y quita el del dia
    document.body.classList.add("fondo-noche");
    document.body.classList.remove("fondo-dia");
  }

  /* Sumar 2 horas a la variable fechaActual2 */
  fechaActual2.setHours(fechaActual.getHours() + 2);

  /*----------------------------------Obtener el clima al iniciar la aplicacion con la longitud y la latitud------------------------------------------*/
  /* Memorizar la funcion para se ejecute solo si sus dependecias cambien */
  const obtenerClimaInicio = useCallback(() => {
    //Obtener la geolocalizacon con la api del navegador
    navigator.geolocation.getCurrentPosition(
      function (position) {
        //El navegador si le damos acceso al navegador nos retorna la latitud y la longitud de nuestra ubicación
        let latitud = position.coords.latitude;
        let longitud = position.coords.longitude;

        const fetchData = async () => {
          try {
            /*------------Peticion a la API para el dia actual con los datos de la longitud y latitud obtenidos por el navegador----------------------*/
            const urlDiaActual = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${apiKey}&lang=es`;
            const responseDiaActual = await axios.get(urlDiaActual);
            /*-------Agregar el nuevo resultado-----------*/
            setClimaActual([{ ...responseDiaActual.data }]);

            /* ------------Peticion a la API para 5 dias con los datos de la longitud y latitud obtenidos por el navegador--------------------------*/
            const urlDias = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&units=metric&appid=${apiKey}&lang=es`;
            const responseDias = await axios.get(urlDias);
            /* Filtrar los datos en base a la hora */
            const climaData = filtrarClima(responseDias.data);
            // Limpiar el estado antes de agregar el nuevo resultado
            setClima([{ ...responseDias.data, list: climaData }]);
          } catch (error) {}
        };

        fetchData();
      },

      //Verificar si el usuario nos da los permisos de la ubicación para obtenerlos con el navegador
      function (error) {
        switch (error.code) {
          //Mostrar error en caso de que el usuario no nos de permiso de usar la ubicación
          case error.PERMISSION_DENIED:
            setErrorPermisoUbicacion(
              "El usuario denegó la solicitud de geolocalización."
            );
            break;
          //Mostrar error en caso de que la información no este disponible
          case error.POSITION_UNAVAILABLE:
            setErrorPermisoUbicacion(
              "La información de ubicación no está disponible."
            );
            break;
          case error.TIMEOUT:
            //Mostrar error en caso de que el tiempo de espera de para permitir el acceso se termine
            setErrorPermisoUbicacion(
              "La información de ubicación no está disponible."
            );
            break;
          case error.UNKNOWN_ERROR:
            //Mostrar error en caso de que sea desconocido
            setErrorPermisoUbicacion(
              "Ocurrió un error desconocido al obtener la ubicación."
            );
            break;
          default:
        }
      }
    );
  }, []);

  /* Hacer la peticion al iniciar la aplicacion */
  useEffect(() => {
    obtenerClimaInicio();
  }, [obtenerClimaInicio]);

  /*----------------------------------------Obtener el clima por ciudad----------------------------------------------------*/
  const mostrarClima = (ciudad) => {
    setErrorCiudad("");
    setErrorPermisoUbicacion("")
    if (ciudad) {
      const getData = async () => {
        try {
          /*--------Peticion a la API para el dia actual con la informacion ingresada en el input--------------*/
          const urlDiaActual = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${apiKey}&lang=es`;
          const responseDiaActual = await axios.get(urlDiaActual);
          // Limpiar el estado antes de agregar el nuevo resultado
          setClimaActual([{ ...responseDiaActual.data }]);

          /*---------Peticion a la API para 5 dias con la informacion ingresada en el input-------------------*/
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=metric&appid=${apiKey}&lang=es`
          );
          const climaFiltrado = filtrarClima(response.data);
          // Agregar el nuevo resultado al estado
          setClima([{ ...response.data, list: climaFiltrado }]);
        } catch (error) {
          // Manejar el error aquí
          setErrorCiudad(
            "El país seleccionado no existe verifique si esta bien escrito o si son dos palabras no pueden estar unidas."
          );
        }
      };

      //Ejecutar la funcion
      getData();
    }
  };

  return (
    <div className="contenedor-principal">
      {!errorCiudad ? "" : <div className="error-pais">{errorCiudad}</div>}
      <Formulario mostrarClima={mostrarClima} setErrorCiudad={setErrorCiudad} />

      {climaActual && (
        <Card el={clima[0]} climaActual={climaActual} diaNoche={diaNoche} />
      )}
      {!errorPermisoUbicacion ? "" : <div className="error-pais">{errorPermisoUbicacion}</div>}
    </div>
  );
}

export default Clima;
