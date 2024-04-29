const nodemailer = require("nodemailer");

module.exports = {
  enviarCorreo: async (req, res) => {
    // Extraer los datos del cuerpo de la solicitud
    const { from, to, subject, text } = req.body;

    // Configurar el transportador de nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "	audra99@ethereal.email",
        pass: "Z6Y2vDTMecY4zWmkKR",
      },
    });

    // Configurar las opciones del correo electrónico con los datos recibidos
    let mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text,
    };

    try {
      // Enviar el correo electrónico
      await transporter.sendMail(mailOptions);
      res.status(200).send("Correo enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).send("Error al enviar el correo");
    }
  },
};
