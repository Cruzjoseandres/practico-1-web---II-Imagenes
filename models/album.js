const { DataTypes } = require("sequelize");
const usuario = require("./usuario");

module.exports = function (sequelize) {
    const Album = sequelize.define(
        'Album',
        {
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            usuarioId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
    );
    return Album;
}