const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/', carritoController.mostrarCarritoJSON);  // GET /carrito
router.post('/', carritoController.agregarCarrito); // Agregar producto

module.exports = router;
