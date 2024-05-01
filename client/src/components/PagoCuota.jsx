import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PagoCuota = ({ agregarNuevaCuota, cuotasEnCreacion }) => {
  const [cuotasPagar, setCuotasPagar] = useState([]);
  const [numeroCuota, setNumeroCuota] = useState("");
  const [prestamo, setPrestamo] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const { id } = useParams();
  console.log({id});

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
      

      //agregarNuevaCuota([cuotaEncontrada]);
    } else {
      console.log("Cuota no encontrada");
    }
  };

  const handleCobrarCuota = async () => {
    try {
      const cuotaPagada = cuotasEnCreacion.find(cuota => cuota.numCuotas === parseInt(numeroCuota));
      if (!cuotaPagada) {
        console.error('Cuota no encontrada');
        return;
      }
  
      const response = await axios.put(`http://localhost:80/api/prestamo/${id}/cuotas/${cuotaPagada.numCuotas}/pagar`);
      
      // Verifica si la solicitud fue exitosa (código de estado 200)
      if (response.status === 200) {
        // Actualiza el estado del componente con los datos actualizados del préstamo
        const prestamoActualizado = response.data.prestamo;
        // Aquí debes actualizar el estado de tu componente con los datos del préstamo actualizado
        // Por ejemplo:
        setPrestamo(prestamoActualizado);
        Swal.fire({
          icon: 'success',
          title: 'Cobrado!',
          text: 'La cuota fue cobrada exitosamente',
        })
      } else {
        console.error('Hubo un problema al pagar la cuota');
      }
    } catch (error) {
      console.error('Error al cobrar la cuota:', error);
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
        <Link to={`/prestamo/${id}/cobrar`} className="btn btn-primary m-3 px-5" onClick={handleCobrarCuota}>Cobrar cuota</Link>
          <Link to="/prestamos" className="btn btn-danger m-3 px-5">
            Cancelar
          </Link>
        </div>
      </div>
    </>
  );
};

export default PagoCuota;
