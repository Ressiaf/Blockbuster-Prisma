//TOKEN JWT 
const jwt = require("jsonwebtoken");
//PASSWORD SCRYPT
const bcrypt = require("bcrypt");
//PRISMA SET UP 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ errorMessage: "All Fields need to be completed" });
        } else {
            let { email, password } = req.body;
            prisma.user
                .findUnique({ where: { email: email } })
                .then((usuarioDB) => {
                if (!usuarioDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "Usuario o contraseña incorrectos",
                        },
                    });
                }
                if (!bcrypt.compareSync(password, usuarioDB.password)) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "Usuario o contraseña incorrectos",
                        },
                    });
                }
                let token = jwt.sign(
                    {usuario: usuarioDB,},
                    process.env.SEED_AUTENTICACION,
                    {expiresIn: process.env.CADUCIDAD_TOKEN,}
                );
                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token,
                });
                })
                .catch((error) => next(error));
        }
    } catch (error) {
        res
        .status(500)
        .json({ errorMessage: "Internal server error" ,error: error})
    }
};

const register = async (req, res ) => {
    try {
        let { email, password, dni, phone } = req.body;
        if (!email || !password || !dni || !phone) {
            res.send.json({
                status: "error",
                error: "All fields must be completed",
            });
        } else {
            const verifyUser = await prisma.user.findMany({
                where: {
                email: email,
                dni: dni,
                phone: phone,
                },
            });
            if (verifyUser.length > 0)
                return res
                    .status(400)
                    .json({ errorMessage: "Email, dni or phone is already in use" });
            let usuario = {
                    email,
                    dni,
                    phone,
                    password: bcrypt.hashSync(password, 10),
            };
            prisma.user.create({ data: usuario }).then((usuarioDB) => {
                return res
                    .status(201)
                    .json({
                        ok: true,
                        usuario: usuarioDB,
                    })
                    .end();
                });
            }
    } catch (error) {
        res
        .status(500)
        .json({ errorMessage: "Internal server error" ,error: error})
    };
};

const logout = (req, res) => {
    req.user = null;
    res
    .status(200)
    .json({
        status: "Succesfull",
        ok: false,
        message: "Your account was successfully closed",
    })
    res.redirect("/login");
};


module.exports = {
    login,
    register,
    logout
};
