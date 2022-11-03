const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const routerUser = Router();

routerUser.post('/register', UserController.createUser);
routerUser.get('/register', UserController.getAll);

module.exports = routerUser;