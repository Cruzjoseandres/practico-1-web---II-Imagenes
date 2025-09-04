const { checkUser } = require("../middleware/check-user.js");


module.exports = (app) => {
  const router = require("express").Router();
  const usuarioController = require("../controllers/usuario.controller.js");

  router.post("/register", usuarioController.createUsuario);
  router.post("/login", usuarioController.loginUsuario);
  router.get("/logout", checkUser, usuarioController.logoutUsuario); 

  app.use("/usuario", router);
};
