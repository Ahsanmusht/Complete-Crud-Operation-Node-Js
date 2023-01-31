const express = require('express');
const User_Router = express.Router();
const UserController = require('../Controllers/User.Controller');


User_Router.get('/', UserController.GetAllUsers)
User_Router.post('/signup', UserController.Signup)
User_Router.post('/login', UserController.Login)

module.exports = User_Router