const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const registration = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then(() => res.send({ message: 'Пользователь успешно зарегистрирован!' }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError({ message: 'Пользователь с таким email уже существует' });
      }
      throw err;
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then(() => res.send({ message: 'Информация успешно обновлена!' }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      throw err;
    })
    .catch(next);
};

// const deleteUser = (req, res, next) => {
//   User.findByIdAndDelete(req.params.id)
//     .then((user) => res.send({ data: user }))
//     .catch(next);
// };

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports = {
  login,
  registration,
  getUserInfo,
  updateUserInfo,
  // deleteUser,
  getUsers,
};
