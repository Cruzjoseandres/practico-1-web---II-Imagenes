const { checkUser } = require("../middleware/check-user");

module.exports = (app) => {
    const router = require("express").Router();
    const imagenAlbumController = require ("../controllers/ImagenAlbum.controller");


    router.post("/", checkUser, imagenAlbumController.createImagenAlbum);

    app.use("/imagen-album", router);
}
