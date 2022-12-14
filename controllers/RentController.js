//PRISMA SET UP 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//MIDDLEWARES
const { rentPrice } = require("../helpers/rentPrice");

const rentMovie = (req, res) => {
    try {
        const { code } = req.params;
        prisma.movies.findUnique({ where: { code: code } }).then((rental) => {
        if (!rental) {
            return res.status(404).json({ errorMessage: "Movie not found" });
        }
        if (rental.stock === 0) {
            return res.status(404).json({ errorMessage: "Movie out of stock" });
        }
        prisma.rents
            .create({
                data: {
                    code: rental.code,
                    id_user: req.user.id,
                    rent_date: new Date(Date.now()),
                    refund_date: new Date(Date.now() + 3600 * 1000 * 24 * 7),
                },
            })
            .then((data) => {
            prisma.movies
                .update({
                    data: { stock: rental.stock - 1, rentals: rental.rentals + 1 },
                    where: { code: rental.code },
                })
                .then(() => res.status(201).json({
                    Message: "you rented successfully",
                    Data: data
                }));
            });
        });
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

const returnRent = async (req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id);
        const rental = await prisma.rents.findUnique({ where: { id_rent: id } });
        if (rental.userRefund_date) return res.status(404).json({ errorMessage: "Rent not found" });
        rental.userRefund_date = new Date();
        const movie = await prisma.movies.findUnique({
            where: { code: rental.code },
        });
        movie.stock++;
        await prisma.movies.update({
            where: { code: movie.code },
            data: { stock: movie.stock },
        });
        await prisma.rents.update({
            where: { id_rent: id },
            data: { userRefund_date: rental.userRefund_date },
        });
        res.status(200).json({
            message: `The movie ${movie.title} was returned`,
            refound_date: rental.userRefund_date,
            price: `${rentPrice(rental.userRefund_date, rental.refund_date)}$`,
        });
        
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

const getAllRents = async (req, res) => {
    try {
        let { order } = req.query;
        order ? (order = order) : (order = "asc");
        let rents = await prisma.rents.findMany();
        if (order === "asc") {
            rents.sort((a, b) => a.id_rent - b.id_rent);
        } else if (order === "desc") {
            rents.sort((a, b) => b.id_rent - a.id_rent);
        }
        rents.length > 0
            ? res.status(200).json(rents)
            : res.status(404).json({ errorMessage: "Rents not found" });
    } catch (error) { 
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

const rentsByUsers = async (req, res, next) => {
    try {
        let { order } = req.query;
        order ? (order = order) : (order = "asc");
        let  allRents = await prisma.rents.findMany({
            where: { id_user: req.user.id },
        });
        let rentsByUser =allRents.filter(rent=>rent.userRefund_date===null)
        if (order === "asc") {
            rentsByUser.sort((a, b) => a.rent_date - b.rent_date);
        } else if (order === "desc") {
            rentsByUser.sort((a, b) => b.rent_date - a.rent_date);
        }
        rentsByUser.length > 0
            ? res.status(200).json(rentsByUser)
            : res.status(404).json({ errorMessage: "Movies not found" });
    } catch (error) {
        res
            .status(500)
            .json({ errorMessage: "Internal server error" })
            .catch((err) => next(err));
    }
};

module.exports = {
    rentMovie,
    returnRent,
    getAllRents, 
    rentsByUsers,
};
