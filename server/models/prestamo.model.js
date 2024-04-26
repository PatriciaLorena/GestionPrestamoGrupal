const mongoose = require('mongoose');
const PrestamoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Cliente",
        required: [true, "el cliente es requerido"],
    },
    monto: { 
        type: Number,
        required: [true, "el monto es requerido"],
        minlength: [3, "el nombre debe tener al menos 3 caracteres"], 
    },
    numCuotas: { 
        type: Number,
        required: [true, "el numero de cuotas es requerido"],
    },
    fechaPrestamo: { 
        type: Date,
        required: [true, "la fecha de prestamo es requerido"],
    },
    interes: { 
        type: Number,
        required: [true, "el interes es requerido"],
    },
    cuotas: [
        {
            numCuotas: { type: Number, required: true },
            fechaVencimiento: { type: Date, required: true },
            montoCuota: { type: Number, required: true },
            mora: { type: Number, required: true},
            diasMora: { type: Number, required: true},
            estado: { type: String, required: true }
        }
    ]
    
}, { timestamps: true });
module.exports.PrestamoModel = mongoose.model('Prestamo', PrestamoSchema);

