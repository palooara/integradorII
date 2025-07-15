const router = require ('express').Router();

const{
    homeApp,
    altaApp,
    nosotrosApp,
    contactoApp
} = require('../controllers/controllerRouter')

router.get('/', homeApp);
router.get('/alta', altaApp);
router.get('/nosotros', nosotrosApp);
router.get('/contacto', contactoApp);

module.exports = router;