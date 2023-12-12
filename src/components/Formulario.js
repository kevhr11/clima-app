import React, { useState } from "react";
import "../hojasDeEstilo/Formulario.css";

function Formulario({ mostrarClima, setErrorCiudad }) {
  const [ciudad, setCiudad] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Vaciar el estado NoValido donde se guardan los errores del input
    setErrorCiudad("");
    //Expresion regular para validar que el input solo contenga text y que no se pueda ingresar caracteres especiales y numeros
    let expresionRegular = /^[a-zA-Z\s]+$/;

    //Funcion para validar si el campo solo contiene texto si es verdadero ejecuta la funcion mostrarClima y si es falso agrega el mensaje al estador noValido para indicar que el input esta vacio, tiene algun caracter especial o algun número
    if (expresionRegular.test(ciudad)) {
      mostrarClima(ciudad);
    } else {
      setErrorCiudad(
        "Verifique que el país este bien escrito respetando los espacios entre palabras y no contenga números o caracteres especiales"
      );
    }
  };

  //Retornar el componente del formularon y si hay un error en el input mostrar el div con el respectivo mensaje
  return (
    /* Contenedor del formulario donde se ingresa el país */
    <div className="formulario-envio">
      <form onSubmit={handleSubmit}>
        {/* Input donde se igresa el país */}
        <input
          type="text"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Ingresar el país o ciudad"
        />
        <button>Buscar</button>
      </form>
    </div>
  );
}

export default Formulario;
