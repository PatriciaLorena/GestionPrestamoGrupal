import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from '../hooks/useForm';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

const CrearPrestamo = ({ updateCuotas }) => {
    const [clientes, setClientes] = useState([]);
    const [fechaPrestamo, setFechaPrestamo] = useState(new Date());
    const initialValues = {
        cliente: '',
        monto: '',
        numCuotas: '6',
        fechaPrestamo: new Date(),
        interes: '10'
    };

    const { values: prestamos, handleChange, clearData } = useForm(initialValues);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:80/api/cliente')
            .then(res => {
                setClientes(res.data.clientes);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prestamos.cliente || !prestamos.monto) {
            alert('Por favor completa todos los campos.');
            return;
        }
        prestamos.fechaPrestamo = fechaPrestamo;
        axios.post('http://127.0.0.1:80/api/prestamo', prestamos)
            .then(res => {
                updateCuotas(res.data);
                console.log(res.data);
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Agregaste un préstamo",
                });
                setError('');
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error.message);
            });

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="text-danger">{error}</div>
                <div className="row align-items-center">
                    <div className="col-auto">
                        <h1>H&N Préstamos</h1>
                    </div>
                    <div className="col-auto ms-auto">
                        <Link to="/" className="btn btn-primary btn-sm me-1 botonAdd estBtn">Volver al inicio</Link>
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <div className="col-auto">
                        <label htmlFor="cliente">Cliente: </label>
                        <select id="cliente" name="cliente" value={prestamos.cliente} onChange={handleChange}>
                            <option value="">Selecciona un cliente</option>
                            {clientes.map(cliente => (
                                <option key={cliente._id} value={cliente._id}>{cliente.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="plazo">Plazo a pagar: </label>
                        <select id="plazo" name="numCuotas" value={prestamos.numCuotas} onChange={handleChange}>
                            <option value="6">6 meses</option>
                            <option value="12">12 meses</option>
                            <option value="18">18 meses</option>
                            <option value="24">24 meses</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="interes">Interés: </label>
                        <select id="interes" name="interes" value={prestamos.interes} onChange={handleChange}>
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                        </select>
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <div className="col-auto">
                        <label htmlFor="monto">Cantidad préstamo: </label>
                        <input type="text" id="monto" name="monto" value={prestamos.monto} onChange={handleChange} />
                    </div>
                    <div className="col-auto">
                        <label className='me-3' htmlFor="fechaPrestamo">Fecha de préstamo: </label>
                        <DatePicker
                            selected={fechaPrestamo}
                            onChange={date => setFechaPrestamo(date)}
                            dateFormat="dd/MM/yyyy"
                            id="fechaPrestamo"
                        />
                    </div>
                </div>
                <div className="row align-items-center mt-3">
                    <button type="submit" className="btn btn-primary">Generar cuotas</button>
                </div>
            </form>

        </div>
    );
}

CrearPrestamo.propTypes = {
    updateCuotas: PropTypes.func
};

export default CrearPrestamo;


