require('dotenv').config();

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_EFM7, {logging: false  });

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

    module.exports = {
        sequelize
    }
