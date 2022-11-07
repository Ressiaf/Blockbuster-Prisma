//FETCH
const fetch = (url) => import("node-fetch").then(({ default: fetch }) => fetch(url));

//API URL
const GHIBLI_APP = "https://ghibliapi.herokuapp.com/films/";


const getMovies = async (req, res , next) => {
    try {
        const { order } = req.query;
        let apiResponse = await fetch(GHIBLI_APP);
        const allFilms = await apiResponse.json();
        if (order === "desc") {
            allFilms.sort((a, b) => b.release_date - a.release_date);
        } else if (order === "asc") {
            allFilms.sort((a, b) => a.release_date - b.release_date);
        }
        allFilms.length > 0
        ? res.status(200).json(allFilms)
        : res.status(404).json({ errorMessage: "Movies not found" });
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error", error: error })
    }
};

const getMovieDetails = async (req, res) => {
    try {
        const { code } = req.params;
        let apiResponse = await fetch("https://ghibliapi.herokuapp.com/films");
        allFilms = await apiResponse.json();
        allFilms = allFilms.map((film) => ({
            code: film.id,
            title: film.title,
            description: film.description,
            director: film.director,
            producer: film.producer,
            release_date: film.producer,
            running_time: film.running_time,
            rt_score: film.rt_score,
        }));
        const film = allFilms.find((film) => code === code);
        res.status(200).send(film);
        } catch (error) {
            res
            .status(500)
            .json({ errorMessage: "Internal server error" })
        }
};

const getMoviesByRuntime = async (req, res) => {
    try {
        const maxRuntime = req.params.max;
        let apiResponse = await fetch(GHIBLI_APP);
        const allFilms = await apiResponse.json();
        if (maxRuntime < 137){
            Films = allFilms.filter((film) => film.running_time <= maxRuntime);
            res.status(200).send(Films)
        } else res.status(404).json({ errorMessage: "Movies not found" });
    } catch (error) {
        res
        .status(500)
        .json({ errorMessage: "Internal server error" })
    }
};

const getMovieByTitle = async (req, res, next) =>{
    try {
        const {title}  = req.body;
        let apiResponse = await fetch(GHIBLI_APP);
        const allFilms = await apiResponse.json();
        const Film = allFilms.find((film) => film.title.includes(title))
        Film
            ? res.status(200).json(Film)
            : res.status(404).json({ errorMessage: "Movie not found" });
    } catch (error) {
        res
        .status(500)
        .json({ errorMessage: "Internal server error", error:error })
    }
}

module.exports = {
    getMovies,
    getMovieDetails,
    getMoviesByRuntime,
    getMovieByTitle,
};
