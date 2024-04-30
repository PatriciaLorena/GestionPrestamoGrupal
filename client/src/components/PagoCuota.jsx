import React, { useState } from "react";
import { Link } from "react-router-dom";

const PagoCuota = ({ agregarNuevaCuota, cuotasEnCreacion }) => {
  const [cuotasPagar, setCuotasPagar] = useState([]);
  const [numeroCuota, setNumeroCuota] = useState("");

  const vaciarinput = () => {
    setNumeroCuota("");
  };

  const handleAgregarCuotas = () => {
    const cuotaEncontrada = cuotasEnCreacion.find(
      (cuota) => cuota.numCuotas === parseInt(numeroCuota)
    );

    if (cuotaEncontrada) {
      const total = cuotaEncontrada.montoCuota + cuotaEncontrada.mora;
      const cuotaConTotal = { ...cuotaEncontrada, total };
      setCuotasPagar((prevCuotas) => [...prevCuotas, cuotaConTotal]);
      vaciarinput();

      //agregarNuevaCuota([cuotaEncontrada]);
    } else {
      console.log("Cuota no encontrada");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const totalAPagar = cuotasPagar.reduce(
    (total, cuota) => total + cuota.total,
    0
  );

  const totalCuotas = cuotasPagar.reduce(
    (total, cuota) => total + cuota.montoCuota,
    0
  );

  const totalMora = cuotasPagar.reduce((total, cuota) => total + cuota.mora, 0);

  return (
    <>
      <div>
        <input
          type="number"
          placeholder="cuota"
          value={numeroCuota}
          onChange={(e) => setNumeroCuota(e.target.value)}
        />
        <button
          className="btn btn-success m-3 px-5"
          onClick={handleAgregarCuotas}
        >
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
        <div className="text-center mt-3" style={{ display: "inline-block" }}>
          <p style={{ display: "inline-block", marginRight: "20px" }}>
            <b>Total de cuotas: </b>${totalCuotas}
          </p>
          <p style={{ display: "inline-block", marginRight: "20px" }}>
            <b>Total de mora:</b> ${totalMora}
          </p>
          <p style={{ display: "inline-block" }}>
            <b>Total a pagar: </b>${totalAPagar}
          </p>
          <button className="btn btn-primary m-3 px-5">Cobrar</button>
          <Link to="/prestamos" className="btn btn-danger m-3 px-5">
            Cancelar
          </Link>
        </div>
      </div>
    </>
  );
};

export default PagoCuota;
