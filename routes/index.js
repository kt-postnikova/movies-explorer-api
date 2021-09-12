const indexRouter = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

indexRouter.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = indexRouter;
