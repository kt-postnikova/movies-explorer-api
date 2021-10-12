const usersRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { userInfoValidator, updateUserInfoValidator } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

usersRouter.get('/users/me', auth, userInfoValidator, getUserInfo);
usersRouter.patch('/users/me', auth, updateUserInfoValidator, updateUserInfo);

// usersRouter.delete('/users/:id', deleteUser);
// usersRouter.get('/users', getUsers);

module.exports = usersRouter;
