const db = require("../models");
const { Op } = require("sequelize");
const { sequelize } = db;
exports.getLogin = (req, res) => {
  res.render("usuario/login", { error: null });
};

exports.getRegister = (req, res) => {
  res.render("usuario/register", { error: null });
};

exports.getHome = async (req, res) => {
  try {
    const usuarioId = req.session.user.id;

    const images = await db.imagen.findAll({
      where: { usuarioId },
      order: [["createdAt", "DESC"]],
    });
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

    console.log("Imágenes encontradas:", images.length);
    console.log("Álbumes encontrados:", albums.length);
    res.render("home/home", {
      user: req.session.user,
      images,
      albums,
      error: null,
    });
  } catch (error) {
    console.error("Error al cargar imágenes:", error);
    res.render("home/home", {
      user: req.session.user,
      images: [],
      albums: [],
      error: "Error al cargar imágenes",
    });
  }
};

exports.getFormImagen = (req, res) => {
  res.render("imagen/crearImagen", { error: null });
};

exports.getFormAlbum = (req, res) => {
  res.render("album/crearAlbum", { error: null });
};

exports.getFormImageAlbum = async (req, res) => {
  const albumId = req.params.id;

  try {
    const album = await db.album.findByPk(albumId);
    if (!album) {
      return res.status(404).send("Álbum no encontrado");
    }
    res.render("album/crearImagen", { error: null, album });
  } catch (error) {
    console.error("Error al cargar el álbum:", error);
    res.status(500).send("Error al cargar el álbum");
  }
};

exports.getFormAddAlbumImage = async (req, res) => {
  const albumId = req.params.id;
  const userId = req.session.user.id;

  try {
    const album = await db.album.findByPk(albumId);
    if (!album) {
      return res.status(404).send("Álbum no encontrado");
    }

    // Obtener IDs de imágenes que ya están en el álbum
    const imagenesEnAlbum = await db.ImagenAlbum.findAll({
      where: { albumId },
      attributes: ["imagenId"],
    });

    // Extraer solo los IDs a un array
    const imagenesIdsEnAlbum = imagenesEnAlbum.map((img) => img.imagenId);

    // Buscar imágenes del usuario que NO están en el álbum
    const imagenes = await db.imagen.findAll({
      where: {
        usuarioId: userId,
        id: {
          [Op.notIn]: imagenesIdsEnAlbum.length ? imagenesIdsEnAlbum : [0],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    console.log(
      `Encontradas ${imagenes.length} imágenes que no están en el álbum ${albumId}`
    );

    res.render("album/seleccionarImagenes", { error: null, album, imagenes });
  } catch (error) {
    console.error("Error al cargar el álbum:", error);
    res.status(500).send("Error al cargar el álbum");
  }
};
