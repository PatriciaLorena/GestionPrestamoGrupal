import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { Link, useParams } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

const ClienteFormUpdate = () => {
    const navegate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [clientes, setClientes] = useState(null);
    const [error, setError] = useState(null);

    const initialValues = {
        name: '',
        lastName: '',
        numCedula: 0,
        telefono: '',
        email: '',
        direccion: ''
    }

    const { values, setValues, handleChange, clearData } = useForm(initialValues);

    useEffect(() => {
        axios.get(`http://127.0.0.1:80/api/cliente/${id}`)
            .then(response => {
                setClientes(response.data.cliente);
                setValues(response.data.cliente); // Setear los valores iniciales del formulario
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, setValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://127.0.0.1:80/api/cliente/${id}`, values)
            .then(res => {
                console.log(res.data.cliente);

                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Actualizaste un cliente",
                });
                navegate("/");
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error.message);
            });
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
                <div className="col-auto">
                    <h1>Editar Cliente</h1>
                </div>
                <div className="col-auto ms-auto">
                    <Link to={`/`} className="btn btn-primary btn-sm me-1 botonAdd estBtn">back to home</Link>
                </div>
                <h3>Edit {clientes.name}</h3>
            </div>
            <div className="text-danger">{error}</div>

                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Nombres:</label>
                            <input type="text" className="form-control" name="name" value={values.name} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Apellidos:</label>
                            <input type="text" className="form-control" name="lastName" value={values.lastName} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Numero de Cedula:</label>
                            <input type="text" className="form-control" name="numCedula" value={values.numCedula} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Telefono:</label>
                            <input type="text" className="form-control" name="telefono" value={values.telefono} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">                      
                            <label className="mr-3">Email:</label>
                            <input type="text" className="form-control" name="email" value={values.email} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Direccion:</label>
                            <input type="text" className="form-control" name="direccion" value={values.direccion} onChange={handleChange} />
                        </div>

            <button type="submit" className="btn btn-primary mt-3" >Editar</button>
            <button type="button" className="btn btn-danger mt-3 ms-3" onClick={() => navegate("/")}>Cancel</button>
        </form>
    );
}

ClienteFormUpdate.propTypes = {
    updateClientes: PropTypes.func
}

export default ClienteFormUpdate;

