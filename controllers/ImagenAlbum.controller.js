const db = require("../models");

exports.createImagenAlbum = async (req, res) => {
  const { url, titulo, descripcion } = req.body;
  const usuarioId = req.session.userId;
  const albumId = req.params.albumId;

  if (!albumId) {
    return res.status(400).json({ error: "ID de álbum no proporcionado" });
  }

  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  try {
    const imagen = await db.Imagen.create({
      url,
      titulo,
      descripcion,
      usuarioId
    });
    await db.ImagenAlbum.create({
      imagenId: imagen.id,
      albumId,
    });

    res.status(201).json(imagen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


exports.addImagenAlbum = async (req, res) => {
  const { albumId } = req.params;
  const { imagenId } = req.body;

  if (!albumId) {
    return res.status(400).json({ error: "ID de álbum no proporcionado" });
  }

  if (!imagenId) {
    return res.status(400).json({ error: "ID de imagen no proporcionado" });
  }

  try {
    await db.ImagenAlbum.create({
      imagenId,
      albumId,
    });
    res.status(201).json({ message: "Imagen añadida al álbum" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

