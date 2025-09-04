const db = require("../models/");
const bcrypt = require("bcrypt");

exports.createUsuario = async (req, res) => {
    try {
        const { email, password, fullName  } = req.body;
        if (!email || !password || !fullName) {
            res.render('usuario/register', { error: 'Todos los campos son requeridos' });
            return;
        }

        const usuarioExistente = await db.usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            res.render('usuario/register', { error: 'El email ya está en uso' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.usuario.create({ email, password: hashedPassword, fullName });
        res.redirect("/login");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {  
        res.render('usuario/login', { error: 'Todos los campos son requeridos' });
        return;
    }

    try {
        const usuario = await db.usuario.findOne({ where: { email } });
        if (!usuario) {
            res.render('usuario/login', { error: 'Credenciales inválidas' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            res.render('usuario/login', { error: 'Credenciales inválidas' });
            return;
        }

        req.session.user = usuario; 
        console.log("User logged in:", req.session.user);
        res.redirect("/");
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.logoutUsuario = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out user:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.redirect("/login");
    });
}