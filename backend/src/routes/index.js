const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/PostController');

// Rotas públicas (sem autenticação)
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/refresh-token', AuthController.refreshToken);
router.post('/auth/logout', AuthController.logout);

// Rotas protegidas (com autenticação)
router.use(authMiddleware);

// Usuários
router.get('/users/me', UserController.me);
router.get('/users/search', UserController.search);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);

// Posts
router.get('/posts', PostController.index);
router.post('/posts', PostController.create);
router.get('/posts/:id', PostController.show);
router.put('/posts/:id', PostController.update);
router.delete('/posts/:id', PostController.delete);
router.post('/posts/:id/like', PostController.like);
router.get('/posts/:id/comments', PostController.comments);
router.post('/posts/:id/comments', PostController.comment);

module.exports = router;
