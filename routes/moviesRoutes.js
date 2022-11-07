//IMPORTS
const express = require('express');
const router = express.Router();

//MIDDLEWARES
const { checkLoggedUser, checkLoggedIn } = require("../middlewares/checks");
const errorHandler = require("../middlewares/errorHandler");

//CONTROLLER
const MovieController = require("../controllers/MovieController");

//ROUTES
router
    .get("/",  MovieController.getMovies)
    .get("/:id",  MovieController.getMovieDetails)
    .get("/search", MovieController.getMovieByTitle)
    .get("/runtime/:max", MovieController.getMoviesByRuntime)
    .use(errorHandler.notFound)

module.exports=router