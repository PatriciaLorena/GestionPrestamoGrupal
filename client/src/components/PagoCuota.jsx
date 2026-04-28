import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const PagoCuota = ({ agregarNuevaCuota, cuotasEnCreacion }) => {
    const [cuotasPagar, setCuotasPagar] = useState([]);
    const [numeroCuota, setNumeroCuota] = useState('');
    const { id } = useParams();

    const calcularMoraActual = (cuota) => {
        if (cuota.estado === 'pagado') return { diasMora: cuota.diasMora, mora: cuota.mora };
        const hoy = new Date();
        const fechaVencimiento = new Date(cuota.fechaVencimiento);
        const diasMora = Math.max(0, Math.floor((hoy - fechaVencimiento) / (1000 * 60 * 60 * 24)));
        const mora = diasMora * 3000;
        return { diasMora, mora };
    };

    const handleAgregarCuotas = () => {
        const cuotaEncontrada = cuotasEnCreacion.find(
            (cuota) => cuota.numCuotas === parseInt(numeroCuota)
        );

        if (!cuotaEncontrada) {
            Swal.fire({ icon: 'warning', title: 'Cuota no encontrada', text: `No existe la cuota número ${numeroCuota}` });
            return;
        }

        const yaAgregada = cuotasPagar.find((c) => c.numCuotas === cuotaEncontrada.numCuotas);
        if (yaAgregada) {
            Swal.fire({ icon: 'info', title: 'Ya agregada', text: `La cuota ${numeroCuota} ya está en la lista` });
            return;
        }

        const { diasMora, mora } = calcularMoraActual(cuotaEncontrada);
        const total = cuotaEncontrada.montoCuota + mora;
        setCuotasPagar((prev) => [...prev, { ...cuotaEncontrada, diasMora, mora, total }]);
        setNumeroCuota('');
    };

    const handleCobrarCuota = async () => {
        if (cuotasPagar.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Sin cuotas', text: 'Agrega al menos una cuota antes de pagar' });
            return;
        }

        try {
            await Promise.all(
                cuotasPagar.map((cuota) =>
                    axios.put(`http://localhost:80/api/prestamo/${id}/cuotas/${cuota.numCuotas}/pagar`)
                )
            );

            const cantidadPagadas = cuotasPagar.length;
            setCuotasPagar([]);
            Swal.fire({
                icon: 'success',
                title: '¡Cobrado!',
                text: `Se pagaron ${cantidadPagadas} cuota(s) exitosamente`,
            }).then(() => window.location.reload());
        } catch (error) {
            console.error('Error al cobrar la cuota:', error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar el pago. Intenta de nuevo.' });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const totalAPagar = cuotasPagar.reduce((total, cuota) => total + cuota.total, 0);
    const totalCuotas = cuotasPagar.reduce((total, cuota) => total + cuota.montoCuota, 0);
    const totalMora = cuotasPagar.reduce((total, cuota) => total + cuota.mora, 0);

    return (
        <div>
            <input
                type="number"
                placeholder="cuota"
                value={numeroCuota}
                onChange={(e) => setNumeroCuota(e.target.value)}
            />
            <button className="btn btn-success m-3 px-5" onClick={handleAgregarCuotas}>
                Agregar cuota a pagar
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Número de Cuota</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Monto de Cuota</th>
                        <th>Mora</th>
                        <th>Días de Mora</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cuotasPagar.map((cuota, index) => (
                        <tr key={index}>
                            <td>{cuota.numCuotas}</td>
                            <td>{formatDate(cuota.fechaVencimiento)}</td>
                            <td>{cuota.montoCuota}</td>
                            <td>{cuota.mora}</td>
                            <td>{cuota.diasMora}</td>
                            <td>{cuota.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center mt-3" style={{ display: 'inline-block' }}>
                <p style={{ display: 'inline-block', marginRight: '20px' }}>
                    <b>Total de cuotas: </b>${totalCuotas}
                </p>
                <p style={{ display: 'inline-block', marginRight: '20px' }}>
                    <b>Total de mora:</b> ${totalMora}
                </p>
                <p style={{ display: 'inline-block' }}>
                    <b>Total a pagar: </b>${totalAPagar}
                </p>
                <button className="btn btn-primary" onClick={handleCobrarCuota}>
                    Pagar
                </button>
                <Link to="/prestamos" className="btn btn-danger m-3 px-5">
                    Cancelar
                </Link>
            </div>
        </div>
    );
};

export default PagoCuota;
