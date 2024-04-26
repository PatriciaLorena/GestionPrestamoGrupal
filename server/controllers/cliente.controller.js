const { ClienteModel } = require("../models/cliente.model");

module.exports = {
    getAllClientes: (req, res) => {
        ClienteModel.find()
            .then((allClientes) => res.status(201).json({ clientes: allClientes }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
    getOneClienteById: (req, res) => {
        ClienteModel.findOne({ _id: req.params.id })
            .then((oneSingleCliente) => res.json({ cliente: oneSingleCliente }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
    createNewCliente: (req, res) => {
        ClienteModel.create(req.body)
        .then((newlyCreatedCliente) => res.status(201).json({ cliente: newlyCreatedCliente }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
    updateOneClienteById: (req, res) => {
        ClienteModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true})
            .then((updatedCliente) => res.status(200).json({ cliente: updatedCliente }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },
    deleteOneClienteById: (req, res) => {
        ClienteModel.deleteOne({ _id: req.params.id })
            .then((result) => res.status(200).json({ clientes: result }))
            .catch((err) =>
                res.status(400).json({ message: "something went wrong", error: err })
            );
    },


}

    