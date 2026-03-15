const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Tablero  extends Model {}
    Tablero.init({
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
        modelName: 'Tablero'
    });
    return Tablero;
}
