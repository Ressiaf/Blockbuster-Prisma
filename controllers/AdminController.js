//FETCH
const fetch = (url) => import("node-fetch").then(({ default: fetch }) => fetch(url));

//API URL
const GHIBLI_APP = "https://ghibliapi.herokuapp.com/films";

//PRISMA SET UP 
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function getFilmFromAPIByName(name) {
    let films = await fetch(GHIBLI_APP);
    films = await films.json();
    return prisma.films.findUnique((film) => film.title.includes(name));
}

const addMovie = (req, res, next) => {
    try {
        let title = req.body.title
        const film = getFilmFromAPIByName(title);
        if (!film) return res.status(404).json({ errorMessage: "Movie not found" });
        const newFilm = {
            code: film.id,
            title: film.title,
            stock: 5,
            rentals: 0,
        };
        prisma.movies
            .create(newFilm)
            .then((newFilm) => res.status(201).json({Message: "Movie Added to database" , data:newFilm}));
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

const updateMovie = async ( req , res , next ) => {
    try {
        let { code } = req.params;
        let { title , stock , rentals } = req.body;
        const film = await prisma.movies.findUnique({ where: { code: code } });
        if (!film) return res.status(404).json({ errorMessage: "Movie not found" });
        const updatedData = {
            code: code, 
            title: title,
            stock: stock,
            rentals: rentals,
        };
        await prisma.movies
            .update({data:updatedData})
            .then((newFilm) => res.status(201).json({Message: "Movie updated to database" , data:newFilm}));
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

const deleteMovie = async ( req , res , next ) => {
    try { 
        let { code } = req.params;
        const film = await prisma.movies.findUnique({ where: { code: code } });
        if (!film) return res.status(404).json({ errorMessage: "Movie not found" });
        await prisma.movies
            .delete({data:film})
            .then( res.status(201).json({Message: "Movie was removed to database" , data:film})); 
    } catch (error) { 
            res
                .status(500)
                .json({ errorMessage: "Internal server error" })
                .catch((err) => next(err));
    }
};


module.exports = {
    addMovie,
    deleteMovie,
    updateMovie,
};
