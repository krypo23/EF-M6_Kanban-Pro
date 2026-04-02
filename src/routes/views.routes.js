const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller.js');

const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/', viewsController.renderHome);
router.get('/register', viewsController.renderRegister);
router.get('/login', viewsController.renderLogin);
router.get('/dashboard', verificarToken, viewsController.renderDashboard);
router.get('/logout', verificarToken, viewsController.logout);
router.post('/nueva-tarjeta', verificarToken, viewsController.agregarTarjeta);
router.post('/nuevo-tablero', verificarToken, viewsController.agregarTablero);
router.post('/nueva-lista', verificarToken, viewsController.agregarLista);


module.exports = router;