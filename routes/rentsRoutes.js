//IMPORTS
const express = require('express');
const router = express.Router();

//MIDDLEWARES
const { checkLoggedIn, checkLoggedUser, checkAdmin } = require("../middlewares/checks");
const errorHandler = require("../middlewares/errorHandler");

//CONTROLLER
const RentController = require("../controllers/RentController");

//ROUTES
router
    .post("/:code", checkLoggedUser, RentController.rentMovie)
    .put("/:id",checkLoggedUser, RentController.returnRent)
    .get("/user", checkLoggedUser, RentController.rentsByUser)
    .get("/all", checkAdmin , RentController.getAllRents)
    .use(errorHandler.notFound)

module.exports=router