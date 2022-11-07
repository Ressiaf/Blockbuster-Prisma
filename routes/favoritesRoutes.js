//IMPORTS
const express = require('express');
const router = express.Router();

//MIDDLEWARES
const { checkLoggedUser} = require("../middlewares/checks");
const errorHandler = require("../middlewares/errorHandler");

//CONTROLLER
const FavoritesController = require("../controllers/FavoriteController");

//ROUTES
router
    .post("/:code" , checkLoggedUser, FavoritesController.addFavorite )
    .get("/all", checkLoggedUser, FavoritesController.allFavoritesMovies )
    .use(errorHandler.notFound)

module.exports=router
