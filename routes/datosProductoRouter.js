const router =  require('express').Router();

const { envioProductos } = require('../controllers/controllerDatosProductos');

router.post('/alta', envioProductos)

module.exports = router;



