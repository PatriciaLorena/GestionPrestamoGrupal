import React, { useState } from 'react';
import CrearPrestamo from './components/CrearPrestamo';
import ListarCuotas from './components/ListarCuotas';

function ListarCrearPrestamo() {
    const [prestamos, setPrestamos] = useState([]);
    const [idPrestamoEnCreacion, setIdPrestamoEnCreacion] = useState("");
    const [componenteLlamador, setComponenteLlamador] = useState('ListarCrearPrestamo');

    const updateCuotas = (nuevoPrestamo) => {
        setPrestamos(prevPrestamos => [...prevPrestamos, nuevoPrestamo]);
        setIdPrestamoEnCreacion(nuevoPrestamo._id); // Guarda el ID del nuevo préstamo en creación
    };

    return (
        <div className="row">
            <CrearPrestamo updateCuotas={updateCuotas} />
            <ListarCuotas prestamos={prestamos} setPrestamos={setPrestamos} idPrestamoEnCreacion={idPrestamoEnCreacion} componenteLlamador="crearPrestamo" />
            <div className='row-12'>

            </div>
        </div>
    );
}

export default ListarCrearPrestamo;
