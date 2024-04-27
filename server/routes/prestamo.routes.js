const express = require("express");
const { authenticate } = require("../config/jwt.config");
const PrestamoController = require("../controllers/prestamo.controller");

const PrestamoRouter = express.Router();

//esto parte de la ruta base /api/prestamo
PrestamoRouter.post("/", authenticate, PrestamoController.createNewPrestamo);
PrestamoRouter.get("/", authenticate, PrestamoController.getAllPrestamos);
PrestamoRouter.get("/:id", authenticate, PrestamoController.getOnePrestamoById);
PrestamoRouter.put(
  "/:id",
  authenticate,
  PrestamoController.updateOnePrestamoById
);
PrestamoRouter.delete(
  "/:id",
  authenticate,
  PrestamoController.deleteOnePrestamoById
);
//PrestamoRouter.get("/:id/cuotas", PrestamoController.createNewCuota);

module.exports = PrestamoRouter;
