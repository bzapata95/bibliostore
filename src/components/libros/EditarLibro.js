import React from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

function EditarLibro({ libro, firestore, history }) {
  if (!libro) return <Spinner />;

  const tituloInput = React.createRef();
  const editorialInput = React.createRef();
  const ISBNInput = React.createRef();
  const existenciaInput = React.createRef();

  const EditarLibro = event => {
    event.preventDefault();

    const libroActualizado = {
      titulo: tituloInput.current.value,
      editorial: editorialInput.current.value,
      ISBN: ISBNInput.current.value,
      existencia: existenciaInput.current.value
    };

    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        libroActualizado
      )
      .then(history.push("/"));
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> Volver al listado
        </Link>
      </div>
      <div className="col-12">
        <h2>
          <i className="fas fa-book"></i> Editar libro
        </h2>

        <div className="row justify-content-center">
          <div className="col-md-8 mt-5">
            <form onSubmit={EditarLibro}>
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  placeholder="Título o nombre del libro"
                  required
                  defaultValue={libro.titulo}
                  ref={tituloInput}
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
                  defaultValue={libro.editorial}
                  ref={editorialInput}
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
                  defaultValue={libro.ISBN}
                  ref={ISBNInput}
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
                  defaultValue={libro.existencia}
                  ref={existenciaInput}
                />
              </div>

              <input
                type="submit"
                value="Editar libro"
                className="btn btn-success btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

EditarLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(EditarLibro);
