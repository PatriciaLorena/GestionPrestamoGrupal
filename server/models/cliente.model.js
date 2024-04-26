const mongoose = require('mongoose');
const ClienteSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "el nombre es requerido"],
        minlength: [3, "el nombre debe tener al menos 3 caracteres"], 
        unique: true,
    },
    lastName: { 
        type: String,
        required: [true, "el nombre es requerido"],
        minlength: [3, "el tipo debe tener al menos 3 caracteres"], 
    },
    numCedula: { 
        type: Number,
        required: [true, "el numero de cedula es requerido"],
        minlength: [6, "el numero de cedula debe tener al menos 6 caracteres"], 
    },
    telefono: { 
        type: String,
        required: [true, "el nombre es requerido"],
        minlength: [6, "el numero de telefono debe tener al menos 6 caracteres"], 
    },
    email: { 
        type: String,
        required: [true, "el email es requerido"],
        minlength: [6, "el email debe tener al menos 6 caracteres"], 
    },
    direccion: {
        type: String,
        required: [true, "la direccion es requerido"],
        minlength: [6, "la direccion debe tener al menos 6 caracteres"],
    },

}, { timestamps: true });
module.exports.ClienteModel = mongoose.model('Cliente', ClienteSchema);

