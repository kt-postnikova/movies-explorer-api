const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  // const token = authorization.replace('Bearer ', '');

  let playload;

  try {
    playload = jwt.verify(authorization, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = playload;
  next();
};
