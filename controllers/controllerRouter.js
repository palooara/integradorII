const datosProducto = require('../models/datosProductosModel');

const homeApp = async (req, res) => {
    try {
        const productos = await datosProducto.find(); // ← carga desde Mongo
        res.render('index', { productos }); // ← los pasa a la vista
    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
};
const altaApp = (req, res) => {
    res.render('alta');
};
const contactoApp = (req, res) => {
    res.render('contacto');
};
const nosotrosApp = (req, res) => {
    res.render('nosotros');
};

module.exports = {
    homeApp,
    altaApp,
    contactoApp,
    nosotrosApp
}