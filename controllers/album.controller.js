const db = require ("../models/");

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
        res.status(204).send();
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
            where: { usuarioId }
        });

        res.render("album/listaAlbum", { albums , error : null});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllAlbumWithLastImage = async (req, res) => {
    const usuarioId = req.session.user.id;

    if (!usuarioId) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }

    try {
        const albums = await db.album.findAll({
            where: { usuarioId },
            include: [{
                model: db.imagen,
                as: "imagenes",
                limit: 1,  
                order: [["createdAt", "DESC"]]  
            }]
        });

        res.render("album/listaAlbum", { albums, error: null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
