const {sequelize} = require('../database/db.js');

const Lista =require('./Lista.js')(sequelize)
const Tarjeta = require('./Tarjeta.js')(sequelize)
const Tablero = require('./Tablero.js')(sequelize)
const Usuario = require('./Usuario.js')(sequelize)


Usuario.hasMany(Tablero);
Tablero.belongsTo(Usuario);

Tablero.hasMany(Lista);
Lista.belongsTo(Tablero);

Lista.hasMany(Tarjeta);
Tarjeta.belongsTo(Lista);


module.exports = {
    sequelize,
    Lista,
    Tarjeta,
    Tablero,
    Usuario
}


