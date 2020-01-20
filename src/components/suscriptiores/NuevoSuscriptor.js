import React from "react";
import { Link } from "react-router-dom";

import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

function NuevoSuscriptor({ firestore, history }) {
  const initialState = {
    nombre: "",
    apellido: "",
    carrera: "",
    codigo: ""
  };

  const [datos, setDatos] = React.useState(initialState);

  const leerDato = event => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    firestore
      .add(
        {
          collection: "suscriptores"
        },
        datos
      )
      .then(() => {
        history.push("/suscriptores");
      });
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/suscriptores" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> Volver al listado
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas fa-user-plus"></i> Nuevo suscriptor
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre del suscriptor"
                  required
                  onChange={leerDato}
                  value={datos.nombre}
                />
              </div>
              <div className="form-group">
                <label>Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  placeholder="Apellido del suscriptor"
                  required
                  onChange={leerDato}
                  value={datos.apellido}
                />
              </div>
              <div className="form-group">
                <label>Carrera:</label>
                <input
                  type="text"
                  className="form-control"
                  name="carrera"
                  placeholder="Carrera del suscriptor"
                  required
                  onChange={leerDato}
                  value={datos.carrera}
                />
              </div>
              <div className="form-group">
                <label>Código:</label>
                <input
                  type="text"
                  className="form-control"
                  name="codigo"
                  placeholder="Código del suscriptor"
                  required
                  onChange={leerDato}
                  value={datos.codigo}
                />
              </div>

              <input
                type="submit"
                value="Agregar suscriptor"
                className="btn btn-success btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

NuevoSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoSuscriptor);
