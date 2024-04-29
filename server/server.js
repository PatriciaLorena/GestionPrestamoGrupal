const express = require("express");
const cors = require("cors");
const app = express();
const port = 80;
const cookieParser = require("cookie-parser");
app.use(express.json(), express.urlencoded({ extended: true }));
const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent to/from origin
  origin: "http://localhost:5173", // Allow only this origin
  methods: "GET, POST, PUT, PATCH, DELETE", // Allow these methods
};
app.use(cors(corsOptions));
app.use(cookieParser());

require("./config/mongose.config");

const ClienteRouter = require("./routes/cliente.routes");
app.use("/api/cliente", ClienteRouter);

const PrestamoRouter = require("./routes/prestamo.routes");
app.use("/api/prestamo", PrestamoRouter);

const UserRouter = require("./routes/user.routes");
app.use("/api/auth", UserRouter);

const EmailRouter = require("./routes/email.routes");
app.use("/api/enviar-correo", EmailRouter);

app.listen(port, () =>
  console.log(`Listening on port: ${port} (http://localhost:${port}/)`)
);
