//IMPORTS
const express = require('express');
const router = express.Router();

//MIDDLEWARES
const { checkAdmin } = require("../middlewares/checks");
const errorHandler = require("../middlewares/errorHandler");

//CONTROLLER
const AdminController = require("../controllers/AdminController");

//ROUTES
router
    .post("/addmovie", checkAdmin, AdminController.addMovie)
    .delete("/deletemovie/:code", checkAdmin, AdminController.deleteMovie)
    .put("/updatemovie/:code", checkAdmin , AdminController.updateMovie)
    .use(errorHandler.notFound)

module.exports=router