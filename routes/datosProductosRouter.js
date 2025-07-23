const router =  require('express').Router();

const { envioProductos,
        eliminarProducto,
        editarProducto,
        traerProductos

 } = require('../controllers/controllerDatosProductos');

 const {
     agregarCarrito,
     mostrarCarrito
 } = require('../controllers/carritoController');

router.post('/productos', envioProductos);

router.get('/productos', traerProductos);

router.delete('/productos/:id', eliminarProducto );

router.put('/productos/:id', editarProducto);


router.get('/carrito', mostrarCarrito);  // GET /carrito
router.post('/carrito', agregarCarrito); // Agregar producto

module.exports = router;


