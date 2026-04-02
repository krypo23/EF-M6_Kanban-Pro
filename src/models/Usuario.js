const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs'); // incluir brycrip

module.exports = (sequelize) => {
    class Usuario extends Model {
        validarPassword(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
    Usuario.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: { // ahora es obligatoria la clave
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Usuario',
            hooks: {
            beforeCreate: async (usuario) => {
                if (usuario.password) {
                    const salt = await bcrypt.genSalt(10);
                    usuario.password = await bcrypt.hash(usuario.password, salt);
                }
            }
        }
    });

    return Usuario;
}