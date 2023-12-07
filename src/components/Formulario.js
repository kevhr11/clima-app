import React, { useState } from "react";
import "../hojasDeEstilo/Formulario.css";

function Formulario({ mostrarClima }) {
  const [ciudad, setCiudad] = useState("");
  const [noValido, setNoValido] = useState("")

  const handleSubmit = (e) => {
    setNoValido("")
    var expresionRegular = /^[a-zA-Z\s]+$/;

    if (expresionRegular.test(ciudad)) {
      console.log("El input contiene solo texto válido.");
      e.preventDefault();
      mostrarClima(ciudad);
    } else {
      e.preventDefault();
      console.log("El input no es válido. Debe contener solo texto.");
      setNoValido("El input no es válido. Debe contener solo texto.");
    }

    /* e.preventDefault();
    mostrarClima(ciudad); */
  };
  return (
    <div className="formulario-envio">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Ingresar el país o ciudad"
        />
        <button>Enviar</button>
      </form>
      {!noValido ? "" : <div className="error">{noValido}</div>}
    </div>
  );
}

export default Formulario;
