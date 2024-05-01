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
  const [clientes, setClientes] = useState([]);


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

    let y = 10;
    let x = 10;

  // Obtener el ancho del documento PDF
  const pdfWidth = doc.internal.pageSize.getWidth();

  // Calcular la posición X para centrar el texto
  const titleWidth = doc.getStringUnitWidth('Informe de Cuotas') * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const titleX = (pdfWidth - titleWidth) / 2;

  const totalWidth = doc.getStringUnitWidth(`Total a pagar: ${prestamoEnCreacion.monto}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const totalX = (pdfWidth - totalWidth);

  const fechaPrestamoWidth = doc.getStringUnitWidth(`Fecha de Creación: ${formatDate(prestamoEnCreacion.createdAt)}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const fechaPrestamoX = (pdfWidth - fechaPrestamoWidth);

  const montoPrestamoWidth = doc.getStringUnitWidth(`Monto: ${prestamoEnCreacion.monto}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const montoPrestamoX = ((pdfWidth - montoPrestamoWidth)/2)-20;

  doc.setFontSize(20);

  // Agregar título centrado en negrita
  doc.setFont("bold");;

    y += 5;

    doc.text(`Informe de Cuotas`, titleX, y);

    // Coordenada y inicial para el primer texto
    y += 10;

    doc.setFontSize(14);
    doc.text(`Cliente: ${prestamoEnCreacion.cliente.name + ' ' + prestamoEnCreacion.cliente.lastName}`, 10, y);
    console.log(prestamoEnCreacion.cliente.name);

    doc.text(`Fecha de prestamo: ${formatDate(prestamoEnCreacion.createdAt)}`, fechaPrestamoX, y);

    y += 7;

    doc.text(`Cuotas: ${cuotasEnCreacion.length}`, 10, y);
    x = 10;

    doc.text(`Monto del prestamo: ${prestamoEnCreacion.monto}`, montoPrestamoX, y);

    const totalAPagar = cuotasEnCreacion.reduce((total, cuota) => {
      return total + parseFloat(cuota.montoCuota);
    }, 0);
  
    doc.text(`Total a pagar: ${totalAPagar}`, totalX, y);

    y += 7;
    doc.autoTable({ html: "#tablaCuotas", startY: y });

    //doc.save("Informe_Cuotas.pdf");

    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl, "_blank");
};


  return (
    <>
    <div className="container">
      <div className=" mt-4">
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
      </div>
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

