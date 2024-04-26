
import { useState } from 'react';
import ListarClientes from './components/ListarClientes'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom"
function ListarCrearClientes() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);

    const updateClientes = (cliente) => {
        setClientes([...clientes, cliente])

    }

    return (
        <div className="row">
            <div className="row align-items-center">
                <div className="col-auto">
                    <h1>Listado de clientes</h1>
                </div>
                <div className="col-auto ms-auto">
                    <Link to={`/cliente/create`} className="btn btn-primary btn-sm me-1 botonAdd estBtn">Agregar nuevo cliente</Link>
                </div>
            </div>
            <ListarClientes clientes={clientes} setClientes={setClientes} />
        </div>
    )
}

export default ListarCrearClientes