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

    comentarios: {
        type: String,
        required: true
    }
});

const datosContacto = mongoose.model("contacto", datosContactoSchema);

module.exports = datosContacto;