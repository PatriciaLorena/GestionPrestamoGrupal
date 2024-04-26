import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'; 

const ListarClientes = ({ clientes, setClientes }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const deleteCliente = (clienteId) => {
        Swal.fire({
            title: "Seguro que quieres eliminar este cliente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:80/api/cliente/${clienteId}`)
                .then(res => {
                    console.log(res)
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado!",
                        text: "Eliminaste un cliente",
                    });
                    // Actualizar la lista de clientes después de la eliminación
                    setClientes(clientes.filter(cliente => cliente._id !== clienteId));
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: "Ocurrió un error al eliminar la cliente",
                    });
                });
            }
        });
    }

    useEffect(() => {
        axios
            .get("http://127.0.0.1:80/api/cliente")
            .then((response) => {
                console.log(response.data.clientes)
                setClientes(response.data.clientes);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setLoading(false);
            });
    }, [setClientes]);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <table className="table table-Light table-striped miborde">
            <thead className="table-secondary">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nº de cedula</th>
                    <th>Telefóno</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente => (
                    <tr key={cliente._id}>
                        <td>{cliente.name}</td>
                        <td>{cliente.lastName}</td>
                        <td>{cliente.numCedula}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.direccion}</td>
                        <td>
                            <Link to={`/prestamos`} className="colorBtn">Ver Prestamos</Link>
                            <Link to={`/cliente/${cliente._id}/update`} className="btn btn-success btn-sm me-1">Editar</Link>
                            <button onClick={() => deleteCliente(cliente._id)} className="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

ListarClientes.propTypes = {
    clientes: PropTypes.array,
    setClientes: PropTypes.func.isRequired
}

export default ListarClientes;
