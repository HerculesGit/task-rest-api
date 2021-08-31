const { Router } = require('express');

const UserController = require('./app/Controllers/UserController');
const TaskController = require('./app/Controllers/TaskController');
const AuthController = require('./app/Controllers/AuthController');

const routes = new Router();

// by user
routes.post('/user', AuthController.createUser);
routes.post('/login', AuthController.login);

routes.get('/users', UserController.getAll);
routes.get('/user/:id', UserController.getOne);

// by tasks
routes.get('/user/:userId/tasks', TaskController.getTasks);
routes.get('/task/:id', TaskController.getOne);
routes.post('/tasks', TaskController.create);
routes.put('/task/:id', TaskController.update);
routes.delete('/task/:id', TaskController.delete);

module.exports = routes;