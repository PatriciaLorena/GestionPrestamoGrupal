import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegistroForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldsError, setFieldsError] = useState("");
  const [emailValidator, setEmailValidator] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (!name.trim() || !email.trim() || password.length < 8) {
      setFieldsError(
        "Todos los campos son requeridos y la contraseña debe tener al menos 8 caracteres"
      );
      return;
    }
    axios
      .post("http://localhost:80/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
          console.log(res);
          Swal.fire("Te has registrado exitosamente");
        } else {
          console.log("Unexpected successful response during register: ", res);
          setError("An unexpected response occurred during register.");
        }
        console.log(res);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setEmailValidator("Introduzca un email válido");
      });
  };

  return (
    <>
      <h3 className="align-center">Registro</h3>

      <form onSubmit={handleSubmit} className="align-center">
        <div>
          <input
            className="small-form"
            type="text"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            className="small-form"
            type="text"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="error">{emailValidator}</div>

        <div>
          <input
            className="small-form"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="error">{fieldsError}</div>
        <div>
          <input
            className="small-form"
            type="password"
            placeholder="Confirmar contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <div className="error">{error}</div>
        <input
          type="submit"
          className="btn btn-primary new-btn mt-3"
          value="Registrarse"
        />
      </form>
      <Link className="align-center">Olvidó su contraseña</Link>
      <div className="align-center">¿Ya tienes una cuenta?</div>
      <Link className="align-center" to={"/login"}>
        Ingresar
      </Link>
    </>
  );
};

export default RegistroForm;
