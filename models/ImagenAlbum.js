const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const ImagenAlbum = sequelize.define(
        'ImagenAlbum',
        {
            imagenId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            albumId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
    );
    return ImagenAlbum;
}