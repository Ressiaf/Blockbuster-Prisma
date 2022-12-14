//IMPORTS
const express = require('express');
const router = express.Router();

//MIDDLEWARES
const { checkLoggedUser, checkLoggedIn } = require("../middlewares/checks");
const errorHandler = require("../middlewares/errorHandler");

//CONTROLLER
const UsersController = require("../controllers/UserController");

//ROUTES
router
    .post("/register", UsersController.register)
    .post("/login", UsersController.login)
    .get("/logout", checkLoggedUser, UsersController.logout)
    .get("/login", (_req, res) => res.send("You must to logued in"))
    .use(errorHandler.notFound)

module.exports=router