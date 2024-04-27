const express = require("express");
const { authenticate } = require("../config/jwt.config");
const ClienteController = require("../controllers/cliente.controller");

const ClienteRouter = express.Router();

//esto parte de la ruta base /api/cliente
ClienteRouter.post("/", authenticate, ClienteController.createNewCliente);
ClienteRouter.get("/", authenticate, ClienteController.getAllClientes);
ClienteRouter.get("/:id", authenticate, ClienteController.getOneClienteById);
ClienteRouter.put("/:id", authenticate, ClienteController.updateOneClienteById);
ClienteRouter.delete(
  "/:id",
  authenticate,
  ClienteController.deleteOneClienteById
);

module.exports = ClienteRouter;
