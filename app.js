//IMPORTS
const express = require('express');
const morgan =  require('morgan');
const app = express();

//VARIABLES
const PORT = process.env.PORT || 3000
const usersRouter= require("./routes/usersRoutes.js")
const moviesRouter = require("./routes/moviesRoutes.js")
const rentsRouter = require("./routes/rentsRoutes")
const favoritesRouter = require("./routes/favoritesRoutes")
const adminRouter = require("./routes/adminRoutes")

//MIDDLEWARES
require("dotenv").config()
app
    .use(express.json())
    .use(morgan("dev"))

//ROUTES
app
    .use('/api/users' , usersRouter )
    .use('/api/movies' , moviesRouter )
    .use('/api/favorites' , favoritesRouter )
    .use('/api/rents' , rentsRouter )
    .use('/api/admin' , adminRouter )

    //LISTEN
app
    .listen(PORT, () => {console.log(`Example app listening on port ${PORT}`)})

module.exports = {
    app,
};