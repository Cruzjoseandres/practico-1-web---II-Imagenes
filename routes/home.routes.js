const { checkUser} = require("../middleware/check-user.js");

module.exports = (app) => {
    const router = require("express").Router();
    const homeController = require("../controllers/home.controller.js");
    

    router.get("/login", homeController.getLogin);
    
    router.get("/register", homeController.getRegister);

    router.get("/", checkUser, homeController.getHome);

    router.get("/createImagen", checkUser, homeController.getFormImagen);
    
    router.get("/createAlbum", checkUser, homeController.getFormAlbum);

    router.get("/createImageAlbum/:id", checkUser, homeController.getFormImageAlbum);

    router.get("/addImageAlbum/:id", checkUser, homeController.getFormAddAlbumImage);


    app.use("/", router);
}