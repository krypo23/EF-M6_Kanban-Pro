const {sequelize, Usuario, Tablero, Lista, Tarjeta} = require('./src/models/index');

const poblarBaseDeDatos = async () => {
    try {
        await sequelize.sync({ force: true });

        const usuario1 = await Usuario.create({
            nombre: 'pedrito',
            email:'pedro@email.cl'
        });

        const usuario2 = await Usuario.create({
            nombre: 'luchito',
            email:'luis@email.cl'
        });
        console.log('Usuarios creados con éxito');

        const tablero1 = await Tablero.create({
            nombre: 'tablero1',
            numero: 1,
            usuarioId: usuario1.id
        });
        const tablero2 = await Tablero.create({
            nombre: 'tablero2',
            numero: 2,
            usuarioId: usuario2.id
        });
        const tablero3 = await Tablero.create({
            nombre: 'tablero3',
            numero: 3,
            usuarioId: usuario1.id
        });
        console.log('Tableros creados con éxito');
        const lista1 = await Lista.create({
            nombre: 'lista 1',
            numero: 1,
            tableroId: tablero1.id
        });

        const lista2 = await Lista.create({
            nombre: 'lista 2',
            numero: 2,
            tableroId: tablero2.id
        });

        const lista3 = await Lista.create({
            nombre: 'lista 3',
            numero: 3,
            tableroId: tablero3.id
        });

        await Tarjeta.create({
            nombre: 'Aprender JS',
            numero: 1,
            listaId: lista1.id
        });
        await Tarjeta.create({
            nombre: 'Aprender ZOD',
            numero: 2,
            listaId: lista2.id
        });
        await Tarjeta.create({
            nombre: 'aprender Sequelizex',
            numero: 3,
            listaId: lista3.id
        });
        console.log('Listas creadas con éxito');
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }finally {
        await  sequelize.close();
    }
};

poblarBaseDeDatos();