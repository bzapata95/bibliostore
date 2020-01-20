import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

function EditarSuscriptor({ suscriptor, firestore, history }) {
  if (!suscriptor) return <Spinner />;

  // Crear los REF
  const nombreInput = React.createRef();
  const apellidoInput = React.createRef();
  const codigoInput = React.createRef();
  const carreraInput = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();
    // crear el objecto que va actualizar
    const suscriptorActualizado = {
      nombre: nombreInput.current.value,
      apellido: apellidoInput.current.value,
      codigo: codigoInput.current.value,
      carrera: carreraInput.current.value
    };

    // almacenar en la base de datos con firebase
    firestore
      .update(
        {
          collection: "suscriptores",
          doc: suscriptor.id
        },
        suscriptorActualizado
      )
      .then(history.push("/suscriptores"));
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
          <i className="fas fa-user"></i> Editar suscriptor
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
                  ref={nombreInput}
                  defaultValue={suscriptor.nombre}
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
                  ref={apellidoInput}
                  defaultValue={suscriptor.apellido}
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
                  ref={carreraInput}
                  defaultValue={suscriptor.carrera}
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
                  ref={codigoInput}
                  defaultValue={suscriptor.codigo}
                />
              </div>

              <input
                type="submit"
                value="Editar suscriptor"
                className="btn btn-success btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor);
