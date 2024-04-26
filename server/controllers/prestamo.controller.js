const { PrestamoModel } = require("../models/prestamo.model");

module.exports = {
    getAllPrestamos: (req, res) => {
        PrestamoModel.find({})
            .populate("cliente", ["name", "lastName"])
            .then((allPrestamos) => res.json({ prestamos: allPrestamos }))
            .catch((err) =>
                res.status(500).json({ message: "something went wrong", error: err })
            );
    },

    createNewPrestamo: (req, res) => {
        const { cliente, monto, numCuotas, fechaPrestamo, interes, cuotas } = req.body;

        const newPrestamo = new PrestamoModel({
            cliente,
            monto,
            numCuotas,
            fechaPrestamo,
            interes,
            cuotas: []
        });

        const montoTotalConIntereses = monto * (1 + interes / 100); 
        const montoCuota = montoTotalConIntereses / numCuotas; 

        function calcularFechaVencimiento(fechaPrestamo, numCuota) {
            const fecha = new Date(fechaPrestamo);
            fecha.setMonth(fecha.getMonth() + numCuota);
            return fecha;
        }

        function calcularMora(fechaVencimiento) {
            const hoy = new Date();
            const diasMora = Math.max(0, Math.floor((hoy - fechaVencimiento) / (1000 * 60 * 60 * 24)));
            const mora = diasMora * 3000; 
            return { diasMora, mora };
        }

        for (let i = 0; i < numCuotas; i++) {
            const fechaVencimiento = calcularFechaVencimiento(fechaPrestamo, i + 1);
            const { diasMora, mora } = calcularMora(fechaVencimiento);
            newPrestamo.cuotas.push({
                numCuotas: i + 1,
                fechaVencimiento,
                montoCuota,
                mora,
                diasMora,
                estado: "pendiente"
            });
        }

        newPrestamo.save()
            .then((prestamo) => PrestamoModel.populate(prestamo, { path: 'cliente' }))
            .then((populatedPrestamo) => res.status(201).json(populatedPrestamo))
            .catch((err) => res.status(500).json({ message: "Something went wrong", error: err }));
    },

    getOnePrestamoById: (req, res) => {
        PrestamoModel.findOne({ _id: req.params.id })
            .then((oneSinglePrestamo) => res.json({ prestamo: oneSinglePrestamo }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },

    updateOnePrestamoById: (req, res) => {
        PrestamoModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
            .then((updatedPrestamo) => res.status(200).json({ prestamo: updatedPrestamo }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },

    deleteOnePrestamoById: (req, res) => {
        PrestamoModel.deleteOne({ _id: req.params.id })
            .then((result) => res.status(200).json({ prestamos: result }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
};

