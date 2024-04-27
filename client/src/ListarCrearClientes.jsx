import { useState } from "react";
import ListarClientes from "./components/ListarClientes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function ListarCrearClientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  const updateClientes = (cliente) => {
    setClientes([...clientes, cliente]);
  };
  const handleLogout = () => {
    logoutUser();
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post("http://localhost:80/api/auth/logout");
      localStorage.removeItem("user");
      if (response.status === 200) {
        navigate("/login");
        console.log(response);
        Swal.fire("Has cerrado sesión");
      } else {
        console.log("Unexpected successful response during logout: ", response);
        setError("An unexpected response occurred during logout.");
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <div className="row">
      <div className="row align-items-center">
        <div className="col-auto">
          <h1>Listado de clientes</h1>
        </div>
        <div className="col-auto ms-auto">
          <Link
            to={`/cliente/create`}
            className="btn btn-primary btn-sm me-1 botonAdd estBtn"
          >
            Agregar nuevo cliente
          </Link>
        </div>
        <div className="col-auto ms-auto">
          {" "}
          <button
            onClick={handleLogout}
            className="btn btn-primary btn-sm me-1 botonAdd estBtn"
          >
            Log out
          </button>
          <div>{error}</div>
        </div>
      </div>
      <ListarClientes clientes={clientes} setClientes={setClientes} />
    </div>
  );
}

export default ListarCrearClientes;
