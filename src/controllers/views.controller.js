const { Tablero, Lista, Tarjeta, Usuario } = require("../models/index");

const renderHome = (req, res) => {
  res.render("home");
};

const renderRegister = (req, res) => {
  res.render("register");
};

const renderLogin = (req, res) => {
  res.render("login");
};

const renderDashboard = async (req, res) => {
  try {
    const usuarioActual = await Usuario.findByPk(req.usuario.id);
    const tablerosBD = await Tablero.findAll({
      where: { UsuarioId: req.usuario.id },
      include: {
        model: Lista,
        include: [Tarjeta],
      },
      order: [
        ["id", "ASC"], // Ordenar los tableros por ID
        [Lista, "id", "ASC"],
        [Lista, Tarjeta, "id", "ASC"],
      ],
    });

    // Convertir el arreglo de resultados a JSON puro
    const todosLosTableros = tablerosBD.map((t) => t.toJSON());

    const temas = ["text-bg-primary", "text-bg-warning", "text-bg-success"];

    //  Mapear cada tablero para que tenga el formato que espera la vista
    const tablerosParaVista = todosLosTableros.map((tableroPuro) => {
      const listasBD = tableroPuro.Listas || tableroPuro.Lista || [];

      return {
        id: tableroPuro.id,
        nombreTablero: tableroPuro.nombre,
        listas: listasBD.map((lista, index) => {
          const tarjetasBD = lista.Tarjetas || lista.Tarjeta || [];
          return {
            id: lista.id,
            titulo: lista.nombre,
            tema: temas[index % temas.length],
            tarjetas: tarjetasBD.map((tarjeta) => ({
              id: tarjeta.id,
              texto: tarjeta.nombre,
            })),
          };
        }),
      };
    });

    // Enviamos el arreglo de tableros a la vista
    // Ahora pasamos "tableros" (plural) en lugar de uno solo
    res.render("dashboard", {
      tableros: tablerosParaVista,
      nombreUsuario: usuarioActual.nombre, // <--- ¡AQUÍ ESTÁ LA MAGIA!
    });
  } catch (error) {
    console.error("Error al cargar el dashboard:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const agregarTarjeta = async (req, res) => {
  try {
    const { listaId, texto } = req.body;

    // Creamos la tarjeta usando la llave foránea correcta (ListumId)
    await Tarjeta.create({
      nombre: texto,
      numero: 1,
      ListumId: listaId,
    });

    // Recargamos el dashboard para ver la nueva tarea
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error al guardar la tarjeta:", error);
    res.status(500).send("Error interno al guardar la tarea");
  }
};

const agregarTablero = async (req, res) => {
  try {
    const { nombre } = req.body;

    await Tablero.create({
      nombre: nombre,
      numero: 1, // Puedes mejorarlo después para que sea dinámico
      UsuarioId: req.usuario.id, // ¡Gracias al middleware sabemos de quién es!
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error al crear tablero:", error);
    res.status(500).send("Error interno al crear tablero");
  }
};

const agregarLista = async (req, res) => {
  console.log("lo que llega en el body :", req.body.tableroId);
  try {
    const { tableroId, nombre } = req.body;

    await Lista.create({
      nombre: nombre,
      numero: 1,
      TableroId: tableroId, // La llave foránea
    });

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error al crear lista:", error);
    res.status(500).send("Error interno al crear lista");
  }
};
const logout = (req, res) => {
    // Opción nuclear: Sobrescribir la cookie con texto vacío y fecha de expiración en el pasado (año 1970)
    res.cookie('kanban_token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0) 
    });
    
    // Redirigimos al login
console.log("✅ [LOGOUT] Cookie destruida con éxito. Redirigiendo a /login");
    res.redirect('/login');
};

module.exports = {
  renderHome,
  renderRegister,
  renderLogin,
  renderDashboard,
  agregarTarjeta,
  agregarTablero,
  agregarLista,
  logout,
};
