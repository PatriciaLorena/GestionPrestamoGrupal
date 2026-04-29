import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import ListarCuotas from "./ListarCuotas";

const ModificarPrestamo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [prestamo, setPrestamo] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [fechaPrestamo, setFechaPrestamo] = useState(new Date());
  const [operacion, setOperacion] = useState(1);

  useEffect(() => {
    // Carga el préstamo actual y el cliente
    axios
      .get(`http://localhost:80/api/prestamo/${id}`)
      .then((response) => {
        setPrestamo(response.data.prestamo);
        setLoading(false);
        axios
          .get(`http://localhost:80/api/cliente/${response.data.prestamo.cliente}`)
          .then((clienteResponse) => {
            setCliente(clienteResponse.data.cliente);
          })
          .catch((err) => {
            console.error(err);
            setError("Error al cargar la información del cliente");
          });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Calcula el próximo número de operación contando todas las cuotas pagadas
    axios
      .get(`http://localhost:80/api/prestamo`)
      .then((response) => {
        const todosPrestamos = response.data.prestamos;
        const totalPagadas = todosPrestamos.reduce((acc, p) => {
          const pagadas = p.cuotas.filter((c) => c.estado === "pagado").length;
          return acc + pagadas;
        }, 0);
        setOperacion(totalPagadas + 1);
      })
      .catch((err) => console.error("Error al calcular número de operación:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPrestamo = { ...prestamo, fechaPrestamo };
      await axios.put(`http://localhost:80/api/prestamo/${id}`, updatedPrestamo);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "El préstamo ha sido actualizado exitosamente.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Ha ocurrido un error al intentar actualizar el préstamo.",
      });
    }
  };

  const agregarNuevaCuota = (nuevaCuota) => {
    console.log("Nueva cuota:", nuevaCuota);
  };

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="text-danger">{error}</div>
        <div className="row align-items-center">
          <div className="col-auto">
            <h1>Cobrar Préstamo</h1>
          </div>
          <div className="col-auto ms-auto">
            <Link to="/" className="btn btn-primary btn-sm me-1 botonAdd estBtn">
              Volver al inicio
            </Link>
          </div>
        </div>
        <div className="row align-items-center mt-3">
          <div className="col-auto">
            <label htmlFor="cliente">Cliente: </label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={cliente ? cliente.name : "Cargando..."}
              disabled
            />
          </div>
          <div className="col-auto">
            <label htmlFor="cobrador">Cobrador: </label>
            <select id="cobrador" name="cobrador">
              <option value="">Selecciona un cobrador</option>
              <option value="1">Hector Cardozo</option>
              <option value="2">Daniel Rojas</option>
            </select>
          </div>
        </div>
        <div className="row align-items-center mt-3">
          <div className="col-auto">
            <label htmlFor="operacion">Numero de operacion: </label>
            <input
              type="number"
              id="operacion"
              name="operacion"
              value={operacion}
              disabled
            />
          </div>
          <div className="col-auto">
            <label htmlFor="fechaPrestamo">Fecha de pago: </label>
            <DatePicker
              selected={fechaPrestamo}
              onChange={(date) => setFechaPrestamo(date)}
              dateFormat="dd/MM/yyyy"
              id="fechaPrestamo"
            />
          </div>
        </div>
      </form>
      <ListarCuotas
        prestamos={prestamo}
        setPrestamos={setPrestamo}
        idPrestamoEnCreacion={id}
        componenteLlamador="cobrarPrestamo"
      />
    </div>
  );
};

ModificarPrestamo.propTypes = {
  updatePrestamo: PropTypes.func,
};

export default ModificarPrestamo;