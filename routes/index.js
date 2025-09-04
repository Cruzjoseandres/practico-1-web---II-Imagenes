module.exports = (app) => {
    require("./usuario.routes")(app);
    require("./album.routes")(app);
    require("./imagen.routes")(app);
    require("./ImagenAlbum.routes")(app);
    require("./home.routes")(app);
};
