const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Tarjeta extends Model {}
    Tarjeta.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Tarjeta'
    });
    return Tarjeta;
}
