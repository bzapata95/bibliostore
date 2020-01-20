import React from "react";
import { Link } from "react-router-dom";

import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

function NuevoLibro({ firestore, history }) {
  const initialState = {
    titulo: "",
    ISBN: "",
    editorial: "",
    existencia: ""
  };
  const [libro, setLibro] = React.useState(initialState);

  const handleInputs = event => {
    setLibro({
      ...libro,
      [event.target.name]: event.target.value
    });
  };

  const agregarLibro = event => {
    event.preventDefault();

    // Agregar arreglo de prestado
    libro.prestados = [];

    firestore
      .add({ collection: "libros" }, libro)
      .then(() => history.push("/"));
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> Volver al listado
        </Link>
      </div>
      <div className="col-md-12">
        <h2>
          <i className="fas fa-book"></i> Nuevo libro
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={agregarLibro}>
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  placeholder="Título o nombre del libro"
                  required
                  value={libro.titulo}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group">
                <label>Editorial:</label>
                <input
                  type="text"
                  className="form-control"
                  name="editorial"
                  placeholder="Editorial del libro"
                  required
                  value={libro.editorial}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group">
                <label>ISBN:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ISBN"
                  placeholder="ISBN del libro"
                  required
                  value={libro.ISBN}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group">
                <label>Existencia:</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  name="existencia"
                  placeholder="Cantidad de existencias"
                  required
                  value={libro.existencia}
                  onChange={handleInputs}
                />
              </div>

              <input
                type="submit"
                value="Agregar libro"
                className="btn btn-success btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

NuevoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoLibro);
