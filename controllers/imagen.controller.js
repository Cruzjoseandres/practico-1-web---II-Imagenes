const { or } = require("sequelize");
const db = require("../models/");

exports.createImagen = async (req, res) => {
  const { url, titulo, descripcion } = req.body;
  const usuarioId = req.session.user.id;

  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  try {
    await db.imagen.create({
      url,
      titulo,
      descripcion,
      usuarioId,
    });
    
    res.redirect("/imagenes");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImagen = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;

  try {
    const imagen = await db.imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    imagen.titulo = titulo;
    imagen.descripcion = descripcion;

    await imagen.save();
    res.status(200).json(imagen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImagen = async (req, res) => {
  const { id } = req.params;

  try {
    const imagen = await db.imagen.findByPk(id);
    if (!imagen) {
      return res.render("error", { error: "Imagen no encontrada" });
    }

    await imagen.destroy();
    res.redirect("/imagenes");
  } catch (error) {
    res.render("/imagenes", { error: "Error al eliminar la imagen" });

  }
};

exports.getAllImages = async (req, res) => {
  const usuarioId = req.session.user.id;

  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }
  console.log("User ID from session:", usuarioId);
  try {
    const images = await db.imagen.findAll({
      where: { usuarioId },
      order: [['createdAt', 'DESC']],
    });
    console.log("Images found:", images);
    res.render("imagen/listaImagenes", { images, error: null });
  } catch (error) {
    res.render("imagen/listaImagenes", { 
      images: [], 
      error: "Error al cargar las imágenes" 
    });
  }
};
