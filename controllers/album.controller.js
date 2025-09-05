const db = require ("../models/");
const {sequelize} = db;


exports.createAlbum = async (req, res) => {
    const { titulo } = req.body;
    const usuarioId = req.session.user.id;

    if (!usuarioId) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }

    try {
        await db.album.create({
            titulo,
            usuarioId
        });
        res.redirect("/album");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAlbum = async (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;

    try {
        const album = await db.album.findByPk(id);
        if (!album) {
            return res.status(404).json({ error: "Album no encontrado" });
        }

        album.titulo = titulo;

        await album.save();
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAlbum = async (req, res) => {
    const { id } = req.params;

    try {
        const album = await db.album.findByPk(id);
        if (!album) {
            return res.status(404).json({ error: "Album no encontrado" });
        }

        await album.destroy();
        res.redirect("/album");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAlbums = async (req, res) => {
    const usuarioId = req.session.user.id;

    if (!usuarioId) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }

    try {
        const albums = await db.album.findAll({
              where: { usuarioId },
              include: [
                {
                  model: db.imagen,
                  as: "imagenes",
                  through: { attributes: [] },
                  required: false,
                  where: {
                    id: sequelize.literal(`(
                  SELECT MAX("imagenId") 
                  FROM "ImagenAlbums" 
                  WHERE "ImagenAlbums"."albumId" = "Album"."id"
                )`),
                  },
                },
              ],
            });
        res.render("album/listaAlbum", { albums , error : null});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getImagenesByAlbum = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID de álbum no proporcionado" });
  }
  
  try {

    const album = await db.album.findByPk(id, {
      include: [{
        model: db.imagen,
        as: "imagenes",
        through: { attributes: [] } 
      }]
    });
    
    if (!album) {
      return res.status(404).json({ error: "Álbum no encontrado" });
    }
    res.render("album/verImagenesAlbum", { album, error: null });
  } catch (error) {
    console.error("Error al obtener imágenes del álbum:", error);
    res.status(500).json({ error: error.message });
  }
};
