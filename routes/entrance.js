const entranceRouter = require('express').Router();
const { registration, login } = require('../controllers/users');
const { registrationValidator, loginValidator } = require('../middlewares/validation');

entranceRouter.post('/signup', registrationValidator, registration);
entranceRouter.post('/signin', loginValidator, login);

module.exports = entranceRouter;
