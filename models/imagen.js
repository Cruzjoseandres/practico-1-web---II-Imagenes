const { url } = require("inspector");
const { DataTypes } = require("sequelize");
const usuario = require("./usuario");

module.exports = function (sequelize) {
    const Imagen = sequelize.define(
        'Imagen',
        {
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            usuarioId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
    );
    return Imagen;
}