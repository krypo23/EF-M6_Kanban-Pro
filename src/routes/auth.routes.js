const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

router.post('/register', authController.registro);

router.post('/login', authController.iniciarSesion);

module.exports = router;