import { useParams } from "react-router-dom";
import ListarCuotas from "./ListarCuotas";
import { useState } from "react";


const ListarCuotasContainer = () => {
  const { id } = useParams();

  const [prestamos, setPrestamos] = useState([]);
  const [cuotasEnCreacion, setCuotasEnCreacion] = useState([]);
  const [prestamoEnCreacion, setPrestamoEnCreacion] = useState(null);


  return (
    <ListarCuotas
      prestamos={prestamos}
      setPrestamos={setPrestamos}
      prestamoEnCreacion={prestamoEnCreacion}
      setPrestamoEnCreacion={setPrestamoEnCreacion}
      cuotasEnCreacion={cuotasEnCreacion}
      setCuotasEnCreacion={setCuotasEnCreacion}
      componenteLlamador="crearPrestamo"
      idPrestamoEnCreacion={id}
    />
  );
};

export default ListarCuotasContainer;
