const { leerArchivo, escribirArchivo } = require('../utils/fileManager');

const renderHome = (req, res) => {
    res.render('home');
};

const renderRegister = (req, res) => {
    res.render('register');
};

const renderLogin = (req, res) => {
    res.render('login');
};

const renderDashboard = (req, res) => {
    
    const tablero = leerArchivo();
    
    if (!tablero) {
        return res.send("Hubo un error cargando el dashboard.");
    }
    
    res.render('dashboard', { tablero });
};

const agregarTarjeta = (req, res) => {
    const { listaId, texto } = req.body;

    const tablero = leerArchivo();
    if (!tablero) return res.send("Error al leer la base de datos.");

    const listaDestino = tablero.listas.find(lista => lista.id === listaId);
    
    if (listaDestino) {
        // Crear la nueva tarjeta (uso Date.now() para generar un ID numérico único rápido)
        const nuevaTarjeta = {
            id: Date.now(),
            texto: texto
        };
        // Se añade la tarjeta al array de tarjetas de esa lista
        listaDestino.tarjetas.push(nuevaTarjeta);
        
        // 4. Escribir el nuevo string sobreescribiendo el archivo data.json
        escribirArchivo(tablero);
    }

    // 5. Redirigir de vuelta al dashboard
    res.redirect('/dashboard');
};

// No olvides exportar la nueva función al final
module.exports = { 
    renderHome, 
    renderRegister, 
    renderLogin, 
    renderDashboard,
    agregarTarjeta 
};
