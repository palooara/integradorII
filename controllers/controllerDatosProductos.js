const datosProducto = require('../models/datosProductosModel');

const envioProductos = async (req, res) => { 
    console.log(req.body); 

    const { nombre, precio, categoria, descripcion } = req.body;
    
    try {
        const nuevoProducto = new datosProducto({
            nombre,
            precio,
            categoria,
            descripcion
        });

        await nuevoProducto.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

module.exports = {
    envioProductos
};