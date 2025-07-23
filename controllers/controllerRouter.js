const datosProducto = require('../models/datosProductosModel');

const homeApp = async (req, res) => {
    try {
        const productos = await datosProducto.find(); // ← carga desde Mongo
        res.render('index', {
  productos,
  usuarioLogueado: req.session.usuarioId ? true : false
});
    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
};

const altaApp = (req, res) => {
    res.render('alta');
};


const nosotrosApp = (req, res) => {
    res.render('nosotros');
};

module.exports = {
    homeApp,
    altaApp,
    nosotrosApp
}