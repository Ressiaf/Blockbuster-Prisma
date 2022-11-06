const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const login = (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
            res.json({
                status: "Error",
                error: { message: "All fields must be completed" },
            });
    } else {
        prisma.user
        .findUnique({ where: { email: body.email } })
        .then((usuarioDB) => {
            if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                status: "Error",
                error: { message: "Incorrect username or password" },
            });
            }
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    status: "Error",
                    error: { message: "Incorrect username or password" },
                });
            }
            let token = jwt.sign(
                { usuario: usuarioDB },
                process.env.SEED_AUTENTICACION,
                { expiresIn: process.env.CADUCIDAD_TOKEN }
            );
            res.status(202).json({
                ok: true,
                status: "Accepted",
                usuario: usuarioDB,token,
                message: "Successful entry",
            });
        })
        .end();
    }
};

const register = (req, res) => {
    let { email, password, dni, phone } = req.body;
    if (!email || !password || !dni || !phone) {
        res.json({
            status: "Error",
            error: { message: "All fields must be completed" },
        });
    } else {
        let usuario = {
            email,
            dni,
            phone,
            password: bcrypt.hashSync(password, 10),
        };
        prisma.user.create({ data: usuario }).then((usuarioDB) => {
        return res
            .status(200)
            .json({
                ok: true,
                usuario: usuarioDB,
                message: "Your account was successfully created",
            })
            .end();
        });
    }
};

const logout = (req, res, next) => {
    req.user = null;
    res.redirect("/login");
    res
        .status(200)
        .json({
            status: "Succesfull",
            ok: false,
            usuario: usuarioDB,
            message: "Your account was successfully closed",
        })
    .end();
};

module.exports = {
    login,
    register,
    logout,
};
