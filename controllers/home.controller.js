exports.getLogin = (req, res) => {
    res.render("usuario/login", { error: null });
}

exports.getRegister = (req, res) => {
    res.render("usuario/register", { error: null });
}

exports.getHome = (req, res) => {
    res.render("home/home", { user: req.session.user });
    console.log("User session:", req.session.user);
};

exports.getFormImagen = (req, res) => {
    res.render("imagen/crearImagen", { error: null });
};

exports.getFormAlbum = (req, res) => {
    res.render("album/crearAlbum", { error: null });
}

