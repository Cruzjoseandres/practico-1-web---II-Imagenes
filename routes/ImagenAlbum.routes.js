const { checkUser } = require("../middleware/check-user");

module.exports = (app) => {
    const router = require("express").Router();
    const imagenAlbumController = require ("../controllers/ImagenAlbum.controller");


    router.post("/create/:id", checkUser, imagenAlbumController.createImagenAlbum);
    router.post("/add/:id", checkUser, imagenAlbumController.addImagenAlbum);
    router.post("/:id/imagen/:imagenId/delete", checkUser, imagenAlbumController.removeImagenAlbum);

    app.use("/imagenAlbum", router);
}
