const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));
const GHIBLI_APP = "https://ghibliapi.herokuapp.com/films/";
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
// JsonWebToken
const jwt = require("jsonwebtoken");

async function getFilmFromAPIByName(name) {
  let films = await fetch("https://ghibliapi.herokuapp.com/films");
  films = await films.json();
  return prisma.films.findUnique((film) => film.title.includes(name));
}

const getMovies = async (req, res) => {
  console.log("Movies");
  let movies = await fetch("https://ghibliapi.herokuapp.com/films");
  movies = await movies.json();
  movies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
  }));
  res.status(200).send(movies);
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  let movies = await fetch("https://ghibliapi.herokuapp.com/films");
  movies = await movies.json();
  movies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
  }));
  const movie = movies.find((movie) => movie.id === id);
  res.status(200).send(movie);
};

const getMoviesByRuntime = async (req, res) => {
  const maxRuntime = req.params.max;
  let movies = await fetch("https://ghibliapi.herokuapp.com/films");
  movies = await movies.json();
  movies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.description,
    director: movie.director,
    producer: movie.producer,
    release_date: movie.producer,
    running_time: movie.running_time,
    rt_score: movie.rt_score,
  }));
  if (maxRuntime < 137)
    movies = movies.filter((movie) => movie.running_time <= maxRuntime);
  res.status(200).send(movies);
};


const getMovieByTitle = async (req, res , next) =>{
  try {
      const {title}  = req.body;
      let movies = await fetch('https://ghibliapi.herokuapp.com/films');
      movies = await movies.json()
      const movie = movies.find((film) => film.title.includes(title))
      res.status(200).json(movie);
  } catch (error) {
      res.status(404).send( "404 - Movie not found" )
      error => next(error);
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
  prisma.movies.create(newMovie)
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

      prisma.favoriteFilms.create({data:newFavouriteFilms}).then((newFav) => {
        if (!newFav) throw new Error("FAILED to add favorite movie");

        res.status(201).json("Movie Added to Favorites");
      });
    });
  } catch (error) {
    (error) => next(error);
  }
};

const allFavouritesMovies = async (req, res, next) => {
  const allFilms = await prisma.favoriteFilms.findMany({
    where: { user_id: req.user.id },
  });
  
  const filmReduced = allFilms.map((film) => {
    if (film.review != null) { return film;
    } else {
        return {
          id: film.id,
          movie_code: film.MovieCode,
          user_id: film.UserId,
        };
      };
  });
  res.status(200).json(filmReduced);
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
