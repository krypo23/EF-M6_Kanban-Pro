const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/', viewsController.renderHome);
router.get('/register', viewsController.renderRegister);
router.get('/login', viewsController.renderLogin);
router.get('/dashboard', viewsController.renderDashboard);
router.post('/nueva-tarjeta', viewsController.agregarTarjeta);

module.exports = router;