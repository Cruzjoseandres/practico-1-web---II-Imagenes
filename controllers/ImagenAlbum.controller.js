const db = require("../models");

exports.createImagenAlbum = async (req, res) => {
  const albumId = req.params.id;
  const { titulo, descripcion } = req.body;
  const { url } = req.files;
  const usuarioId = req.session.user.id;

  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }


  try {
  const imagen = await db.imagen.create({
        titulo,
        descripcion,
        usuarioId,
      });
      
      if (url) {
        const uploadedFile = __dirname + '/../public/uploads/' + imagen.id + '.jpg';
        await url.mv(uploadedFile);
        await db.imagen.update({ url: imagen.id + '.jpg' }, { where: { id: imagen.id } });
      }
  if (!albumId) {
    return res.status(400).json({ error: "ID de álbum no proporcionado" });
  }

    await db.ImagenAlbum.create({
      imagenId: imagen.id,
      albumId,
    });
    res.redirect("/album/" + albumId);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};



exports.addImagenAlbum = async (req, res) => {
  const albumId = req.params.id;
  let { imagenId } = req.body;
  console.log("id imagenes", imagenId);

  if (!albumId) {
    return res.status(400).render("error", { error: "ID de álbum no proporcionado" });
  }

  if (!imagenId) {
    return res.redirect("/album/" + albumId);
  }

  if (!Array.isArray(imagenId)) {
    imagenId = [imagenId];
  }

  try {
   /* imagenId.forEach(async imagen => {
        await db.ImagenAlbum.create({
            imagenId: imagen,
            albumId,
        });
        console.log("Imagen añadida:", imagen);
    });.*/

    const registros = imagenId.map(id => ({
      imagenId: id,
      albumId,
    }));

    await db.ImagenAlbum.bulkCreate(registros);
    res.redirect("/album/" + albumId);
  } catch (error) {
    console.error("Error al añadir imágenes:", error);
    res.status(500).render("error", { error: "Error al añadir imágenes al álbum" });
  }
};


exports.removeImagenAlbum = async (req, res) => {
  const { albumId, imagenId } = req.params;

  if (!albumId) {
    return res.status(400).json({ error: "ID de álbum no proporcionado" });
  }
  if (!imagenId) {
    return res.status(400).json({ error: "ID de imagen no proporcionado" });
  }

  try{
    const result = await db.ImagenAlbum.destroy({
      where: { albumId, imagenId }
    });
    if (result) {
      res.status(200).json({ message: "Imagen eliminada del álbum" });
    } else {
      res.status(404).json({ error: "No se encontró la relación entre el álbum y la imagen" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




