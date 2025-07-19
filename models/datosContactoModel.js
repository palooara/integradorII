const mongoose = require('mongoose');

// Definimos el esquema para los datos de contacto

const datosContactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true // Aseguramos que el email sea único
    },

    telefono:{
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now // Fecha por defecto al momento de crear el contacto
    },

    comentarios: {
        type: String,
        required: true
    }
});

const datosContacto = mongoose.model("contactos", datosContactoSchema);

module.exports = datosContacto;