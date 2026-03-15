const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class Usuario extends Model {}
    Usuario.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'usuario'
    });
    return Usuario;
}