const router =  require('express').Router();

const { envioProductos,
        eliminarProducto,
        editarProducto,
        traerProductos

 } = require('../controllers/controllerDatosProductos');

router.post('/productos', envioProductos);

router.get('/productos', traerProductos);

router.delete('/productos/:id', eliminarProducto );

router.put('/productos/:id', editarProducto);

module.exports = router;


