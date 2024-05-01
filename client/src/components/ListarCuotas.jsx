import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PagoCuota from "./PagoCuota";
import SendCorreo from "./SendCorreo";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ListarCuotas = ({
  prestamos,
  setPrestamos,
  idPrestamoEnCreacion,
  componenteLlamador,
  agregarNuevaCuota,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:80/api/prestamo")
      .then((res) => {
        setPrestamos(res.data.prestamos);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setPrestamos]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Filtra las cuotas del préstamo en creación
  const prestamoEnCreacion = prestamos.find(
    (prestamo) => prestamo._id === idPrestamoEnCreacion
  );
  const cuotasEnCreacion = prestamoEnCreacion ? prestamoEnCreacion.cuotas : [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const generarInformePDF = () => {
    const doc = new jsPDF();
    
    doc.text("Informe de Cuotas", 10, 10);
    doc.autoTable({ html: "#tablaCuotas" });
    //doc.save("Informe_Cuotas.pdf");
    // Obtener la URL del archivo PDF generado
  const pdfUrl = doc.output("bloburl");

  // Abrir la URL en una nueva pestaña del navegador
  window.open(pdfUrl, "_blank");

  };

  return (
    <>
      <div className="mt-4">
        <h2>Lista de cuotas:</h2>
        <table id="tablaCuotas" className="table">
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
            {cuotasEnCreacion.map((cuota, index) => (
              <tr key={index}>
                <td>{cuota.numCuotas}</td>
                <td>{formatDate(cuota.fechaVencimiento)}</td>
                <td>{cuota.montoCuota}</td>
                <td>{cuota.mora}</td>
                <td>{cuota.diasMora}</td>
                <td>{cuota.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {prestamoEnCreacion && (
          <>
            {componenteLlamador === "crearPrestamo" ? (
              <>
                <b>Total a pagar: </b>$
                {prestamoEnCreacion
                  ? prestamoEnCreacion.cuotas.reduce(
                      (acc, cuota) => acc + cuota.montoCuota,
                      0
                    )
                  : 0}
                <br></br>
                <Link to="/prestamos" className="btn btn-primary m-3 px-5">
                  Guardar
                </Link>
              </>
            ) : (
              <>
                <PagoCuota
                  agregarNuevaCuota={agregarNuevaCuota}
                  cuotasEnCreacion={cuotasEnCreacion}
                />
              </>
            )}
          </>
        )}
      </div>
      <SendCorreo
        fechaVencimiento={
          cuotasEnCreacion.length > 0
            ? cuotasEnCreacion[0].fechaVencimiento
            : null
        }
      />
      <button className="btn btn-primary m-3 px-5" onClick={generarInformePDF}>
        Generar Informe PDF
      </button>
    </>
  );
};

ListarCuotas.propTypes = {
  prestamos: PropTypes.array.isRequired,
  setPrestamos: PropTypes.func.isRequired,
  idPrestamoEnCreacion: PropTypes.string.isRequired,
  componenteLlamador: PropTypes.oneOf(["crearPrestamo", "cobrarPrestamo"])
    .isRequired,
};

export default ListarCuotas;

