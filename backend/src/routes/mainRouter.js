const express = require('express');
const { allUsers, register, login, changePhoto, deleteAccount } = require('../controller/mainController');

const mainRouter = express.Router();

mainRouter.get('/allUsers', allUsers);
mainRouter.post('/register', register);
mainRouter.post('/login', login);
mainRouter.post('/changePhoto', changePhoto);
mainRouter.post('/deleteAccount', deleteAccount);

module.exports = mainRouter;
