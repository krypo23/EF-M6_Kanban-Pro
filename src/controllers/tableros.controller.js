const { Tablero } = require('../models/index');

// GET: Obtener todos los tableros del usuario logueado
const obtenerTableros = async (req, res) => {
    try {
        // req.usuario.id viene del token que desencriptó el middleware
        const tableros = await Tablero.findAll({ 
            where: { usuarioId: req.usuario.id } 
        });
        res.status(200).json(tableros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tableros' });
    }
};

// POST: Crear un nuevo tablero
const crearTablero = async (req, res) => {
    try {
        const { nombre, numero } = req.body;
        
        if (!nombre || !numero) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (nombre, numero)' });
        }

        const nuevoTablero = await Tablero.create({
            nombre,
            numero,
            usuarioId: req.usuario.id // Lo asociamos automáticamente al usuario logueado
        });

        res.status(201).json(nuevoTablero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el tablero' });
    }
};

// PUT: Actualizar un tablero existente
const actualizarTablero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, numero } = req.body;

        // Buscamos el tablero asegurándonos de que pertenezca al usuario
        const tablero = await Tablero.findOne({ 
            where: { id, usuarioId: req.usuario.id } 
        });

        if (!tablero) {
            return res.status(404).json({ error: 'Tablero no encontrado o no tienes permisos' });
        }

        tablero.nombre = nombre || tablero.nombre;
        tablero.numero = numero || tablero.numero;
        await tablero.save();

        res.status(200).json(tablero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tablero' });
    }
};

// DELETE: Borrar un tablero
const eliminarTablero = async (req, res) => {
    try {
        const { id } = req.params;

        const tablero = await Tablero.findOne({ 
            where: { id, usuarioId: req.usuario.id } 
        });

        if (!tablero) {
            return res.status(404).json({ error: 'Tablero no encontrado o no tienes permisos' });
        }

        await tablero.destroy();
        res.status(200).json({ mensaje: 'Tablero eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el tablero' });
    }
};

module.exports = { obtenerTableros, crearTablero, actualizarTablero, eliminarTablero };