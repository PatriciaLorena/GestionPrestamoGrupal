const express = require("express");
const cors = require("cors");
const app = express();
const port = 80;

app.use(cors());
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

require("./config/mongose.config");

const ClienteRouter = require("./routes/cliente.routes");
app.use("/api/cliente", ClienteRouter);

const PrestamoRouter = require("./routes/prestamo.routes");
app.use("/api/prestamo", PrestamoRouter);


app.listen( port, () => console.log(`Listening on port: ${port} (http://localhost:${port}/)`)); 