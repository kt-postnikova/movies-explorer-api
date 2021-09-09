const usersRouter = require('express').Router();
const { getUserInfo, updateUserInfo, deleteUser, getUsers } = require('../controllers/users');
const { userInfoValidator } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

usersRouter.delete('/users/:id', deleteUser);
usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', auth, userInfoValidator, getUserInfo);
usersRouter.patch('/users/me', auth, userInfoValidator, updateUserInfo);



module.exports = usersRouter;
