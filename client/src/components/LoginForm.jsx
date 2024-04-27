import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:80/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Please enter a valid e-mail and password or register");
      });
  };

  return (
    <div className="row align-center">
      <h3>Log in</h3>
      <div className="error">{error}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="small-form"
            type="text"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className=" small-form"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary new-btn mt-3"
          value="Ingresar"
        />
      </form>
      <Link>Olvidó su contraseña</Link>
      <br />
      <div>¿Todavía no tienes una cuenta?</div>
      <Link to={"/register"}>Registrarse</Link>
    </div>
  );
};

export default LoginForm;
