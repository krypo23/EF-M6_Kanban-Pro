const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    console.log("\n--- 🕵️ DETECTIVE MIDDLEWARE ---");
    console.log("Intentando entrar a la ruta:", req.originalUrl);
    
    // 1. Imprimimos TODAS las cookies que el navegador nos está enviando
    console.log("Cookies recibidas del navegador:", req.cookies);

    let token = null;
    
    if (req.cookies && req.cookies.kanban_token) {
        console.log("✅ Token encontrado en las COOKIES.");
        token = req.cookies.kanban_token;
    } else if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
        console.log("✅ Token encontrado en los HEADERS (Postman).");
        token = req.headers['authorization'].split(' ')[1];
    } else {
        console.log("❌ No se encontró NINGÚN token (Ni cookie, ni header).");
    }

    // 2. Si no hay token
    if (!token) {
        console.log("🛑 Bloqueando el paso. Redirigiendo al Login...");
        if (req.originalUrl.startsWith('/api/')) {
            return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
        }
        return res.redirect('/login');
    }

    // 3. Verificar el token
    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRETO);
        req.usuario = decodificado; 
        console.log("🟢 Pase libre concedido para el usuario ID:", req.usuario.id);
        next(); 
    } catch (error) {
        console.error("⚠️ Error verificando token (falso o expirado):", error.message);
        
        if (req.originalUrl.startsWith('/api/')) {
            return res.status(403).json({ error: 'Token inválido o expirado.' });
        }
        res.clearCookie('kanban_token', { path: '/' });
        return res.redirect('/login');
    }
};

module.exports = { verificarToken };