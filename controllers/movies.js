const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({
    owner: userId,
  })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send({ movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.find({ _id: req.params.id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      Movie.deleteOne({ _id: req.params.id })
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
