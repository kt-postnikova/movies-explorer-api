const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { createMovieValidator } = require('../middlewares/validation');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', auth, createMovieValidator, createMovie);
moviesRouter.delete('/movies/:id', auth, deleteMovie);

module.exports = moviesRouter;
