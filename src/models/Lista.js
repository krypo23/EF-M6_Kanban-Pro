const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Lista extends Model {}
    Lista.init({
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
        modelName: 'Lista'
    });
    return Lista;
}