const express = require("express");
//const { authenticate } = require("../config/jwt.config");
const PrestamoController = require("../controllers/prestamo.controller");

const PrestamoRouter = express.Router();

//esto parte de la ruta base /api/prestamo
PrestamoRouter.post("/", PrestamoController.createNewPrestamo);
PrestamoRouter.get("/", PrestamoController.getAllPrestamos);
PrestamoRouter.get("/:id", PrestamoController.getOnePrestamoById);
PrestamoRouter.put(
  "/:id",
  PrestamoController.updateOnePrestamoById
);
PrestamoRouter.delete(
  "/:id",
  PrestamoController.deleteOnePrestamoById
);
//PrestamoRouter.get("/:id/cuotas", PrestamoController.createNewCuota);
PrestamoRouter.put(
  "/:prestamoId/cuotas/:cuotaId/pagar",
  PrestamoController.pagarCuota
);
module.exports = PrestamoRouter;
