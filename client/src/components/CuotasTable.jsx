import React from 'react';

const CuotasTable = ({ cuotas }) => {
    return (
        <div className="mt-4">
            <h2>Detalles de las cuotas:</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Número de Cuota</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Monto de Cuota</th>
                        <th>Mora</th>
                        <th>Días de Mora</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {cuotas.map((cuota, index) => (
                        <tr key={index}>
                            <td>{cuota.numCuotas}</td>
                            <td>{cuota.fechaVencimiento}</td>
                            <td>{cuota.montoCuota}</td>
                            <td>{cuota.mora}</td>
                            <td>{cuota.diasMora}</td>
                            <td>{cuota.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CuotasTable;
