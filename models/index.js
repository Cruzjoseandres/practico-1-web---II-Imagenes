const { sequelize } = require("../config/db.config");

const usuario = require("./usuario")(sequelize);
const album = require("./album")(sequelize);
const imagen = require("./imagen")(sequelize);
const ImagenAlbum = require("./ImagenAlbum")(sequelize);

// Relaciones:
// Un usuario tiene muchos álbumes
usuario.hasMany(album, { foreignKey: 'usuario', as: 'albumes' });
album.belongsTo(usuario, { foreignKey: 'usuario', as: 'usuarioData' });

//Relación de muchos a muchos, para que una imagen pueda pertenecer a muchos álbumes
album.belongsToMany(imagen, { through: ImagenAlbum, foreignKey: 'albumId', as: 'imagenes' });
imagen.belongsToMany(album, { through: ImagenAlbum, foreignKey: 'imagenId', as: 'albumes' });

// Un usuario puede subir muchas imágenes
usuario.hasMany(imagen, { foreignKey: 'usuarioId', as: 'imagenes' });
imagen.belongsTo(usuario, { foreignKey: 'usuarioId', as: 'usuarioData' });

module.exports = {
    usuario,
    album,
    imagen,
    ImagenAlbum,
    sequelize,
}