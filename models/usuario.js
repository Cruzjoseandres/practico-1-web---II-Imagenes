const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Usuario = sequelize.define(
        'Usuario',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
            },
            fullName: {
                type: DataTypes.STRING,
            },
        },
    );
    return Usuario;
}