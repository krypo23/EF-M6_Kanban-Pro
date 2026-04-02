const { Usuario } = require("../models/index");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const JWT_SECRETO = process.env.JWT_SECRETO;

const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const nuevoUsuario = await Usuario.create({ nombre, email, password });

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error en el servidor al registrar usuario" });
  }
};

const iniciarSesion = async (req, res) => {
  console.log("Inicia Iniciar Sesion");
  try {
    const { email, password } = req.body;

    // Buscar al usuario por su email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Validar contraseña (usando el método que creamos en tu modelo Usuario.js)
    const passwordValido = usuario.validarPassword(password);
    if (!passwordValido) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar el JSON Web Token (JWT)
    console.log("iD ", usuario.id, "email", usuario.email);
    console.log("JWT", JWT_SECRETO);
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRETO,
      { expiresIn: "1h" },
    );

    // Creado con PATH explícito
    res.cookie("kanban_token", token, {
      httpOnly: true,
      path: "/", // <--- ¡AÑADIR ESTO AQUÍ TAMBIÉN!
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor al iniciar sesión" });
  }
};

module.exports = { registro, iniciarSesion };
