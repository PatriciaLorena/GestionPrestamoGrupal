const express = require("express");

const ClienteController = require("../controllers/cliente.controller");

const ClienteRouter = express.Router();

//esto parte de la ruta base /api/cliente
ClienteRouter.post("/", ClienteController.createNewCliente);
ClienteRouter.get("/", ClienteController.getAllClientes);
ClienteRouter.get("/:id", ClienteController.getOneClienteById);
ClienteRouter.put("/:id", ClienteController.updateOneClienteById);
ClienteRouter.delete("/:id", ClienteController.deleteOneClienteById);

module.exports = ClienteRouter;