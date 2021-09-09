const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

moviesRouter.get('/movies', auth, getMovies);
moviesRouter.post('/movies', auth, createMovie);
moviesRouter.delete('/movies/:id', auth, deleteMovie);

module.exports = moviesRouter;