const { Router } = require('express');

const UserController = require('./app/Controllers/UserController');
const TaskController = require('./app/Controllers/TaskController');
const AuthController = require('./app/Controllers/AuthController');

const routes = new Router();

const { verifyToken } = require('./app/Services/JWTTokenService');

// by user
routes.post('/user', AuthController.createUser);
routes.post('/login', AuthController.login);

routes.get('/users', UserController.getAll);
routes.get('/user/:id', UserController.getOne);

// by tasks
routes.get('/user/:userId/tasks', verifyToken, TaskController.getTasks);
routes.get('/task/:id', verifyToken, TaskController.getOne);
routes.post('/tasks', verifyToken, TaskController.create);
routes.put('/task/:id', verifyToken, TaskController.update);
routes.delete('/task/:id', verifyToken, TaskController.delete);

module.exports = routes;