const express = require("express");
const PrestamoController = require("../controllers/prestamo.controller");

const PrestamoRouter = express.Router();

// base: /api/prestamo
PrestamoRouter.get("/", PrestamoController.getAllPrestamos);
PrestamoRouter.post("/", PrestamoController.createNewPrestamo);
PrestamoRouter.get("/:id", PrestamoController.getOnePrestamoById);
PrestamoRouter.put("/:prestamoId/cuotas/:cuotaId/pagar", PrestamoController.updateCuota);
PrestamoRouter.put("/:id", PrestamoController.updateOnePrestamoById);
PrestamoRouter.delete("/:id", PrestamoController.deleteOnePrestamoById);

module.exports = PrestamoRouter;
