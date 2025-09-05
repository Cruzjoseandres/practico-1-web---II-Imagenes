const { checkUser} = require("../middleware/check-user.js");

module.exports = (app) => {

    const router = require("express").Router();
    const imagenController = require("../controllers/imagen.controller.js");

    router.get("/", checkUser, imagenController.getAllImages);
    router.post("/create", checkUser, imagenController.createImagen);
    router.post("/:id/delete", checkUser, imagenController.deleteImagen);
    router.get("/:id", checkUser, imagenController.getImagenById);

    app.use("/imagenes", router);
}