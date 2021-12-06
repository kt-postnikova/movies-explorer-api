const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
// const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({
    owner: userId,
  })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  // const owner = req.user._id;
  // const {
  //   country,
  //   director,
  //   duration,
  //   year,
  //   description,
  //   image,
  //   trailer,
  //   thumbnail,
  //   nameRU,
  //   nameEN,
  //   movieId,
  // } = req.body;

  // Movie.create({
  //   country,
  //   director,
  //   duration,
  //   year,
  //   description,
  //   image,
  //   trailer,
  //   thumbnail,
  //   nameRU,
  //   nameEN,
  //   movieId,
  //   owner,
  // })
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send({ movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  // const ownerId = req.user._id;
  // const { id } = req.params;
  Movie.find({ _id: req.params.id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      Movie.deleteOne({ _id: req.params.id })
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
      // if (movie.owner.toString() !== ownerId) {
      //   throw new ForbiddenError('Нет доступа к данным');
      // }
      // return movie.remove()
      //   .then(() => res.send({ message: 'Фильм удалён' }))
      //   .catch(next);
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
