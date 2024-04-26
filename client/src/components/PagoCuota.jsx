import React, { useState } from 'react';

const PagoCuota = ({ agregarNuevaCuota, cuotasEnCreacion }) => {
    const [cuotasPagar, setCuotasPagar] = useState([]);

    const handleAgregarCuotas = () => {
        // Aquí puedes agregar la lógica para generar las cuotas a pagar
        // Por ahora, simplemente añadiremos algunas cuotas de ejemplo
        const nuevasCuotas = [
            { numCuota: 1, fechaVencimiento: '2024-05-01', montoCuota: 100, mora: 0, diasMora: 0, total: 100 },
            { numCuota: 2, fechaVencimiento: '2024-06-01', montoCuota: 100, mora: 0, diasMora: 0, total: 100 }
        ];
        setCuotasPagar(nuevasCuotas);
        agregarNuevaCuota(nuevasCuotas); // Aquí puedes pasar las nuevas cuotas al componente padre si lo necesitas
    };

    return (
        <div>
            <input type="number" placeholder="cuota" />
            <button className="btn btn-success m-3 px-5" onClick={handleAgregarCuotas}>Agregar cuotas a pagar</button>
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
                            <td>{cuota.numCuota}</td>
                            <td>{cuota.fechaVencimiento}</td>
                            <td>{cuota.montoCuota}</td>
                            <td>{cuota.mora}</td>
                            <td>{cuota.diasMora}</td>
                            <td>{cuota.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PagoCuota;
