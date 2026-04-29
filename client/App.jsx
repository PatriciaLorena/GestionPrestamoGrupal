import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./src/components/Layout";
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
import ListarCuotasContainer from "./src/components/listarCuotasContainer";

const App = () => {
  const [clientes, setCLientes] = useState([]);
  const [prestamos, setPrestamos] = useState([]);

  return (
    <Routes>
      {/* Páginas SIN sidebar (login y registro) */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistroForm />} />

      {/* Páginas CON sidebar */}
      <Route path="/" element={
        <Layout><ListarCrearClientes clientes={clientes} setClientes={setCLientes} /></Layout>
      } />
      <Route path="/inicio" element={
        <Layout><Inicio /></Layout>
      } />
      <Route path="/cliente/create" element={
        <Layout><CrearCliente /></Layout>
      } />
      <Route path="/cliente/:id/update" element={
        <Layout><ClienteFormUpdate /></Layout>
      } />
      <Route path="/prestamos" element={
        <Layout><VerPrestamos /></Layout>
      } />
      <Route path="/prestamo/create" element={
        <Layout><ListarCrearPrestamo /></Layout>
      } />
      <Route path="/prestamo/:id/cobrar" element={
        <Layout><CobrarPrestamo /></Layout>
      } />
      <Route path="/prestamo/:id/cuotas" element={
        <Layout><ListarCuotasContainer /></Layout>
      } />
    </Routes>
  );
};

export default App;
