const express = require('express');
const router = express.Router();
const tablerosController = require('../controllers/tableros.controller');
const { verificarToken } = require('../middlewares/auth.middleware');


// TODAS las rutas de abajo requerirán el token JWT
router.use(verificarToken);

// Rutas CRUD para los Tableros
router.get('/', tablerosController.obtenerTableros);
router.post('/', tablerosController.crearTablero);
router.put('/:id', tablerosController.actualizarTablero);
router.delete('/:id', tablerosController.eliminarTablero);

module.exports = router;