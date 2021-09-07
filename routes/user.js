const usersRouter = require('express').Router();
const { getUserInfo, updateUserProfile } = require('../controllers/users');

usersRouter.get('/users/me', getUserInfo);
usersRouter.patch('/users/me', updateUserProfile);

module.exports = usersRouter;
