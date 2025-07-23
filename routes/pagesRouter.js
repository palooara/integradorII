const router = require ('express').Router();

const{
    homeApp,
    altaApp,
    nosotrosApp
} = require('../controllers/controllerRouter')

router.get('/', homeApp);
router.get('/alta', altaApp);
router.get('/nosotros', nosotrosApp);

module.exports = router;