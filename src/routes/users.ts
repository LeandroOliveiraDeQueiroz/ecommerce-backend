import express from 'express';
import { UserRepository } from '../repository';
import client from '../db';
import { UserService } from '../services';
import { UserController } from '../controllers/userController';
import Joi from 'joi';
import { UserRepositoryErrorProxy } from '../repository/user/proxy';

const userRouter = express.Router();

//TODO create a Factory

const userRepository = new UserRepository(client);
const userRepositoryErrorProxy = new UserRepositoryErrorProxy(userRepository);
const userService = new UserService(userRepositoryErrorProxy);

const signinSchema = Joi.object().keys({
  name: Joi.string().min(1).max(256).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(256).required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(256).required(),
});

const userController = new UserController(
  userService,
  signinSchema,
  loginSchema
);

userRouter.post('/signin', userController.signin.bind(userController));

userRouter.post('/login', userController.login.bind(userController));

export default userRouter;
