const express = require('express');
const router = express.Router();
const {
  mostrarLogin,
  mostrarRegistro,
  registrar,
  login,
  logout
} = require('../controllers/authController');

router.get('/login', mostrarLogin);
router.post('/login', login);

router.get('/registro', mostrarRegistro);
router.post('/registro', registrar);

router.get('/logout', logout);

module.exports = router;
