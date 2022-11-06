//FETCH
const fetch = (url) => import("node-fetch").then(({ default: fetch }) => fetch(url));

//URL & TOKEN 
const GHIBLI_APP = "https://ghibliapi.herokuapp.com/films";
const JWT = require("jsonwebtoken");

//PRISMA SET UP 
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


async function getFilmFromAPIByName(name) {
  let films = await fetch(GHIBLI_APP);
  films = await films.json();
  return prisma.films.findUnique((film) => film.title.includes(name));
}
const getMovies = async (req, res) => {
  try {
    const { order } = req.query;
    const response = await fetch(GHIBLI_APP);
    const movies = await response.json();
      if (order === "desc") {
        movies.sort((a, b) => b.release_date - a.release_date);
      } else if (order === "asc") {
        movies.sort((a, b) => a.release_date - b.release_date);
      }
    movies.length > 0
    ? res.status(200).json(movies)
    : res.status(404).json({ errorMessage: "Movies not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let movies = await fetch(GHIBLI_APP);
    movies = await movies.json();
    const movie = movies.find((movie) => movie.id === id);
    movie = movie.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
    }));
    movie
      ? res.status(200).json(movie)
      : res.status(404).json({ errorMessage: "Movie not found" });
  res.status(200).send(movie);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" });
  }
}

const getMoviesByRuntime = async (req, res , next ) => {
  try {
    const maxRuntime = req.params.max;
    let movies = await fetch(GHIBLI_APP);
    movies = await movies.json();
    if (maxRuntime < 137){
      movies = movies.filter((movie) => movie.running_time <= maxRuntime);
      res.status(200).send(movies)
    } else res.status(404).json({ errorMessage: "Movies not found" });
  } catch (error) {
      res.status(500).json({ errorMessage: "Internal server error" })
      .catch((err) => next(err));
  }
};

const getMovieByTitle = async (req, res) =>{
  try {
      const {title}  = req.body;
      let movies = await fetch(GHIBLI_APP);
      movies = await movies.json()
      const movie = movies.find((film) => film.title.includes(title))
      movie
        ? res.status(200).json(movie)
        : res.status(404).json({ errorMessage: "Movie not found" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" })
    .catch((err) => next(err));
  }
}

const addMovie = (req, res, next) => {
  const movie = getFilmFromAPIByName(req.body.title);
  const newMovie = {
    code: movie.id,
    title: movie.title,
    stock: 5,
    rentals: 0,
  };
  prisma.movies
    .create(newMovie)
    .then((movie) => res.status(201).send("Movie Stocked"))
    .catch((err) => next(err));
};

const addFavourite = async (req, res, next) => {
  try {
    const code = req.params.code;
    const { review } = req.body;
    prisma.movies.findUnique({ where: { code: code } }).then((film) => {
      if (!film) throw new Error(" Movie dont avalaible ");
      const newFavouriteFilms = {
        movie_code: film.code,
        user_id: req.user.id, 
        review: review,
      };
      prisma.favoriteFilms
        .create({data:newFavouriteFilms})
        .then((newFav) => {
          if (!newFav) throw new Error("FAILED to add favorite movie");
          res.status(201).json("Movie Added to Favorites");
      });
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" })
    .catch((err) => next(err));
  }
};

const allFavouritesMovies = async (req, res, next) => {
  try {
    const allFilms = await prisma.favoriteFilms.findMany({
      where: { user_id: req.user.id },
    });
    res.status(200).json(allFilms);
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal server error" })
  }
};


module.exports = {
  getMovies,
  getMovieDetails,
  getMoviesByRuntime,
  addMovie,
  addFavourite,
  allFavouritesMovies,
  getMovieByTitle,
};
