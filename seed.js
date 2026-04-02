const {sequelize, Usuario, Tablero, Lista, Tarjeta} = require('./src/models/index');

const poblarBaseDeDatos = async () => {
    try {
        await sequelize.sync({ force: true });

        const usuario1 = await Usuario.create({
            nombre: 'pedrito',
            email:'pedro@email.cl',
            password: 'password123'
        });

        const usuario2 = await Usuario.create({
            nombre: 'luchito',
            email:'luis@email.cl',
            password: 'password123'
        });
        const usuario3 = await Usuario.create({
            nombre: 'juanito',
            email:'juan@email.cl',
            password: 'password123'
        });
        console.log('Usuarios creados con éxito');

        // ¡OJO ACÁ! Cambiamos a UsuarioId (con U mayúscula)
        const tablero1 = await Tablero.create({
            nombre: 'tablero1',
            numero: 1,
            UsuarioId: usuario1.id 
        });
        const tablero2 = await Tablero.create({
            nombre: 'tablero2',
            numero: 2,
            UsuarioId: usuario2.id
        });
        const tablero3 = await Tablero.create({
            nombre: 'tablero3',
            numero: 3,
            UsuarioId: usuario1.id
        });
        console.log('Tableros creados con éxito');

        // ¡OJO ACÁ! Cambiamos a TableroId (con T mayúscula)
        const lista1 = await Lista.create({
            nombre: 'lista 1',
            numero: 1,
            TableroId: tablero1.id 
        });

        const lista2 = await Lista.create({
            nombre: 'lista 2',
            numero: 2,
            TableroId: tablero2.id 
        });

        const lista3 = await Lista.create({
            nombre: 'lista 3',
            numero: 3,
            TableroId: tablero3.id 
        });

        // ¡OJO ACÁ! Sequelize y su latín: ListumId
        await Tarjeta.create({
            nombre: 'Aprender JS',
            numero: 1,
            ListumId: lista1.id 
        });
        await Tarjeta.create({
            nombre: 'Aprender ZOD',
            numero: 2,
            ListumId: lista2.id 
        });
        await Tarjeta.create({
            nombre: 'aprender Sequelizex',
            numero: 3,
            ListumId: lista3.id 
        });
        console.log('Listas y Tarjetas creadas con relaciones perfectas ✅');

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        await sequelize.close();
    }
};

poblarBaseDeDatos();