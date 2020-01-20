import React from "react";

import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

function Login({ firebase }) {
  const initialState = {
    email: "",
    password: ""
  };
  const [datos, setDatos] = React.useState(initialState);

  const handleInputs = event => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    });
  };

  const iniciarSesion = event => {
    event.preventDefault();

    // comparamos
    const { email, password } = datos;

    firebase
      .login({ email, password })
      .then(res => console.log("Iniciaste sesión"))
      .catch(err => console.log("Hubo un error"));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="text-center py-4">
              <i className="fas fa-lock"></i> Iniciar sesión
            </h2>
            <form onSubmit={iniciarSesion}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={datos.email}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={datos.password}
                  onChange={handleInputs}
                />
              </div>

              <input
                type="submit"
                className="btn btn-success btn-block"
                value="Inicia sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
