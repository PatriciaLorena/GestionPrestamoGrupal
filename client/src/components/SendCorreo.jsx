import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const SendCorreo = ({ fechaVencimiento }) => {
  const [correoEnviado, setCorreoEnviado] = useState(false);

  useEffect(() => {
    const calcularFechaEnvio = () => {
      const unDiaAntes = new Date(fechaVencimiento);
      unDiaAntes.setDate(unDiaAntes.getDate() - 1); // Resta 1 día
      return unDiaAntes;
    };

    const fechaEnvio = calcularFechaEnvio();

    const timerId = setTimeout(() => {
      enviarCorreo();
    }, fechaEnvio.getTime() - Date.now());

    return () => clearTimeout(timerId);
  }, [fechaVencimiento]);

  const enviarCorreo = async () => {
    try {
      await axios.post("http://localhost:80/api/enviar-correo", {
        from: "	audra99@ethereal.email",
        to: "yosoyuncorreodeprueba@gmail.com",
        subject: "Recordatorio de vencimiento de cuota",
        text: "Su cuota está próxima a vencer",
      });
      setCorreoEnviado(true);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  };
};

// Agregamos la validación de PropTypes para fechaVencimiento
SendCorreo.propTypes = {
  fechaVencimiento: PropTypes.instanceOf(Date).isRequired,
};

export default SendCorreo;
