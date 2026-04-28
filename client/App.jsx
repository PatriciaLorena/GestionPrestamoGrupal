import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ListarCrearClientes from "./src/ListarCrearClientes";
import CrearCliente from "./src/components/CrearCliente";
import VerPrestamos from "./VerPrestamos";
import ClienteFormUpdate from "./src/components/ClienteFormUpdate";
import ListarCrearPrestamo from "./src/ListarCrearPrestamo";
import CobrarPrestamo from "./src/components/CobrarPrestamo";
import LoginForm from "./src/components/LoginForm";
import RegistroForm from "./src/components/RegistroForm";
import Inicio from "./src/components/Inicio";
import PagoCuota from "./src/components/PagoCuota";
import { useParams } from "react-router-dom";
import ListarCuotas from "./src/components/ListarCuotas";
import ListarCuotasContainer from "./src/components/listarCuotasContainer";

const App = () => {
  const [clientes, setCLientes] = useState([]);
  const { id } = useParams();
  console.log(id);
  const [prestamos, setPrestamos] = useState([]);
  const [cuotasEnCreacion, setCuotasEnCreacion] = useState([]);
  const [prestamoEnCreacion, setPrestamoEnCreacion] = useState(null);
  

  const updateCLientes = (cliente) => {
    setCLientes([...clientes, cliente]);
  };

  return (
    <div className="container mt-3">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistroForm />} />

       
        
        <Route
          path="/"
          element={
            <ListarCrearClientes
              clientes={clientes}
              setClientes={setCLientes}
            />
          }
        />

        <Route path="/inicio" element={<Inicio />} />
        <Route path="/cliente/create" element={<CrearCliente />} />
        <Route path="/prestamo/:id/cobrar" element={<CobrarPrestamo />} />
        <Route path="/prestamos" element={<VerPrestamos />} />
        <Route path="/cliente/:id/update" element={<ClienteFormUpdate />} />
        <Route path="/prestamo/create" element={<ListarCrearPrestamo />} />
        <Route path="/prestamo/:id/cuotas/:cuotaId/pagar" element={<PagoCuota />} />
        <Route path="/prestamo/:id/cuotas" 
        element={<ListarCuotasContainer />} />


      </Routes>
    </div>
  );
};

export default App;
