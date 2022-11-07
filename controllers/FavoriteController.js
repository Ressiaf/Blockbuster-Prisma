const addFavourite = async (req, res, next) => {
    try {
        const code = req.params.code;
        const { review } = req.body;
        prisma.movies.findUnique({ where: { code: code } }).then((film) => {
        if (!film) throw new Error("Movie dont avalaible");
        const newFavouriteFilms = {
            movie_code: film.code,
            user_id: req.user.id,
            review: review,
        };
        prisma.favoriteFilms
            .create({ data: newFavouriteFilms })
            .then((newFav) => {
            if (!newFav) throw new Error("FAILED to add favorite movie");
            res.status(201).json("Movie Added to Favorites");
            });
        });
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
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
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

module.exports = {
    addFavourite,
    allFavouritesMovies,
};
