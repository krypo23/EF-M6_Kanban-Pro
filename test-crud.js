const {
  sequelize,
  Usuario,
  Tablero,
  Lista,
  Tarjeta,
} = require("./src/models/index");

const probarCRUD = async () => {
  try {
    console.log("1 - Crear: Crear una nueva Tarjeta y asociarla a una Lista existente.");
    const listaExistente = await Lista.findOne(); // lee la primera lista para agregar una lista
    const nuevatarjeta = await Tarjeta.create({
      nombre: "Ejercitar HBS",
      numero: 1, //le damos un numero a la tarjeta, distinto al ID autogenerado, es para en el fondo identificarla por parte del usuario
      ListumId: listaExistente.id,
    });
    console.log("#1  -La nueva tarjeta es:",nuevatarjeta.toJSON());

    console.log("2 - Leer: Leer un Tablero incluyendo sus Listas y Tarjetas asociadas (usando include)");
    const tableroCompleto = await Tablero.findOne({
      where: { id: 1 },
      include: {
        model: Lista,
        include: [Tarjeta], // Incluir 
      },
    });
    console.log("#2 - Tablero completo de id :1",tableroCompleto.toJSON());


    console.log("3 - Actualizar: Modificar el título de una Tarjeta o Lista.");
    const listaAActualizar = await Lista.findOne({ where: { numero: 1 } });
    listaAActualizar.nombre = "Resolver bugs helpers (Urgente)";
    await listaAActualizar.save();
    console.log("#3 - Lista actualizada:",listaAActualizar.toJSON());

    // Cambiamos el nombre y guardamos en la BD
       console.log("4 - Eliminar una Tarjeta .");
    const tarjetaABorrar = await Tarjeta.findOne({
      where: { nombre: "Ejercitar HBS" }, //eliminar la tarjeta creada en un principio
    });
     await tarjetaABorrar.destroy();
    console.log("#4 - Tarjeta borrada:",tarjetaABorrar.toJSON());

    } catch (error) {
    console.log(error.message);
  } finally {
    await sequelize.close();
  }
};
probarCRUD();
