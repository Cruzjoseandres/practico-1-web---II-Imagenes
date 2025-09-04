const { checkUser } = require("../middleware/check-user.js");

module.exports = (app) => {
    const router = require("express").Router();
    const albumController = require("../controllers/album.controller.js");

    router.post("/", checkUser, albumController.createAlbum);
    router.post("/:id", checkUser, albumController.updateAlbum);
    router.post("/:id/delete", checkUser, albumController.deleteAlbum);
    router.get("/", checkUser, albumController.getAlbums);
    app.use("/album", router);
}