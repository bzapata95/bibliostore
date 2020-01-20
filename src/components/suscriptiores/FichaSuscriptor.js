import React from "react";

export default function FichaSuscriptor({ alumno }) {
  return (
    <div className="card my-3">
      <h3 className="card-header bg-primary text-white">Datos solicitante</h3>

      <div className="card-body">
        <p className="font-weight-bold">
          Nombre: <span className="font-weight-normal">{alumno.nombre}</span>
        </p>
        <p className="font-weight-bold">
          Código: <span className="font-weight-normal">{alumno.codigo}</span>
        </p>
        <p className="font-weight-bold">
          Carrera: <span className="font-weight-normal">{alumno.carrera}</span>
        </p>
      </div>
    </div>
  );
}
