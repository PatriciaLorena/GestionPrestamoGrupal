import { useState, useEffect } from "react"
import useForm from "../hooks/useForm"
import axios from "axios"
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"
import { useNavigate, useParams } from "react-router-dom"
import '../App.css';

const ClienteForm = () => {
    const navegate = useNavigate();
    const initialValues = {
        name: '',
        lastName: '',
        numCedula: 0,
        telefono: '',
        email: '',
        direccion: ''
    }

    const { values: clientes, handleChange, clearData } = useForm(initialValues)
    const [error, setError] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        
        axios.post('http://127.0.0.1:80/api/cliente', clientes)
            .then(res => {
                console.log(res.data.clientes)

                clearData()
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Agregaste una cliente",

                });
                setError("")
                navegate("/")
            })
            .catch(err => {
                console.log(err)
                setError(err.response.data.error.message)
            })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
                <div className="col-auto">
                    <h1>Nuevo Cliente</h1>
                </div>
                <div className="col-auto ms-auto">
                    <Link to={`/`} className="btn btn-primary btn-sm me-1 botonAdd estBtn">back to home</Link>
                </div>
            </div>
            <div className="text-danger">{error}</div>

            <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Nombres:</label>
                            <input type="text" className="form-control" name="name" value={clientes.name} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Apellidos:</label>
                            <input type="text" className="form-control" name="lastName" value={clientes.lastName} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Numero de Cedula:</label>
                            <input type="text" className="form-control" name="numCedula" value={clientes.numCedula} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Telefono:</label>
                            <input type="text" className="form-control" name="telefono" value={clientes.telefono} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Email:</label>
                            <input type="text" className="form-control" name="email" value={clientes.email} onChange={handleChange} />
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <label className="mr-3">Direccion:</label>
                            <input type="text" className="form-control" name="direccion" value={clientes.direccion} onChange={handleChange} />
                        </div>

            <button type="submit" className="btn btn-primary mt-3" >Agregar</button>
            <button type="button" className="btn btn-danger mt-3 ms-3" onClick={() => navegate("/")}>Cancel</button>
        </form>

    )
}

ClienteForm.propTypes = {
    updateClientes: PropTypes.func
}

export default ClienteForm