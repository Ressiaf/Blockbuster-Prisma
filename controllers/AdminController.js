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
  