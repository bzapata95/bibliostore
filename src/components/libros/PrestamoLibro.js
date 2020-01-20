import React from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

import FichaSuscriptor from "../suscriptiores/FichaSuscriptor";

function PrestamoLibro({ libro, firestore, history }) {
  const [term, setTerm] = React.useState("");
  const [alumno, setAlumno] = React.useState(null);
  const [resultado, setResultado] = React.useState(false);

  if (!libro) return <Spinner />;

  const buscarAlumno = event => {
    event.preventDefault();

    const coleccion = firestore.collection("suscriptores");
    const consulta = coleccion.where("codigo", "==", term).get();

    consulta.then(res => {
      if (res.empty) {
        //No hay resultados
        setResultado(true);
        setAlumno(null);
      } else {
        //si hay resultados
        const datos = res.docs[0];
        setAlumno(datos.data());
        setResultado(false);
      }
    });
  };

  const solicitarPrestamo = () => {
    const suscriptor = {
      ...alumno,
      fecha_solicitud: new Date().toLocaleDateString()
    };

    // Agregando suscriptor al libro
    libro.prestados.push(suscriptor);

    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        libro
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
          <i className="fas fa-book"></i> Prestamo libro: {libro.titulo}
        </h2>

        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <form onSubmit={buscarAlumno} className="mb-4">
              <legend className="color-primary text center">
                Busca el suscriptor por código:
              </legend>
              <div className="form-group">
                <input
                  type="text"
                  name="busqueda"
                  className="form-control"
                  placeholder="Ingresa el código"
                  valie={term}
                  onChange={event => setTerm(event.target.value)}
                />
              </div>
              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Buscar alumno"
              />
            </form>

            {/* Muestra la ficha y el boton */}

            {alumno && (
              <React.Fragment>
                <FichaSuscriptor alumno={alumno} />
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={solicitarPrestamo}
                >
                  Solicitar prestamo
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

PrestamoLibro.propTypes = {
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
)(PrestamoLibro);
