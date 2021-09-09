const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
}

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  console.log(owner);
  const { country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId } = req.body;

  Movie.create({ country, director, duration, year, description, image, trailer, thumbnail, nameRU, nameEN, movieId, owner })
    .then((movie) => res.send({ movie }))
    .catch(next)
}

// const deleteMovie = (req, res, next) => {
//   const ownerId = req.user._id;
//   const { id } = req.params;
//   Movie.findById(id)
//     .then((movie) => {
//       if (movie.owner.toString() === ownerId) {
//         Movie.findByIdAndDelete(id)
//           .then((deletedMovie) => {
//             if (!deletedMovie) {
//               throw new NotFoundError('Фильм не найден');
//             }
//             res.send(deletedMovie);
//           });
//       } else {
//         throw new ForbiddenError('Нет доступа к данным');
//       }
//     })
//     .catch((err) => {
//       // if (err.name === 'CastError') {
//       //   throw new BadRequestError('Переданы некорректные данные');
//       // } else if (err.statusCode === 403) {
//       //   throw new ForbiddenError('Нет доступа к данным');
//       // }
//       // next();
//     })
//     .catch(next);
// }

const deleteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (movie.owner.toString() === ownerId) {
        Movie.findByIdAndDelete(id)
          .then(() => res.send({ message: 'Фильм успешно удален!' }))
      }
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
}