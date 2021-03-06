'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');

Route.on('/').render('index');

Route.post('/login', 'UsersController.login');
Route.post('/register', 'UsersController.register');
Route.get('/users', 'UsersController.index');

Route.get('/posts', 'PostsController.index').middleware('auth');
Route.post('/posts', 'PostsController.store').middleware('auth');
Route.put('/posts/:id', 'PostsController.update').middleware('auth');

Route.post('/attachment', 'AttachmentController.upload'); //.middleware('auth')
Route.get('/attachment/:id', 'AttachmentController.get'); //.middleware('auth')
