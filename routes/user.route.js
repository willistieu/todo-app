const express = require('express');
const { createUser, getAllUser, signIn, changePassword } = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/signup', createUser)
userRouter.post('/signin', signIn)
userRouter.put('/changepassword', changePassword)

module.exports = userRouter