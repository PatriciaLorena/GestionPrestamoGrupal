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
const App = () => {
  const [clientes, setCLientes] = useState([]);

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
        <Route path="/cliente/create" element={<CrearCliente />} />
        <Route path="/prestamo/:id/cobrar" element={<CobrarPrestamo />} />
        <Route path="/prestamos" element={<VerPrestamos />} />
        <Route path="/cliente/:id/update" element={<ClienteFormUpdate />} />

        <Route path="/prestamo/create" element={<ListarCrearPrestamo />} />
      </Routes>
    </div>
  );
};

export default App;
