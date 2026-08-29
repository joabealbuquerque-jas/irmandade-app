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

// Grupos
router.get('/groups', (req, res) => {
  res.json({ message: 'Lista de grupos' });
});
router.post('/groups', (req, res) => {
  res.json({ message: 'Criar grupo' });
});
router.get('/groups/:id', (req, res) => {
  res.json({ message: 'Detalhes do grupo' });
});
router.put('/groups/:id', (req, res) => {
  res.json({ message: 'Atualizar grupo' });
});
router.delete('/groups/:id', (req, res) => {
  res.json({ message: 'Deletar grupo' });
});
router.post('/groups/:id/join', (req, res) => {
  res.json({ message: 'Entrar no grupo' });
});
router.delete('/groups/:id/leave', (req, res) => {
  res.json({ message: 'Sair do grupo' });
});

// Stories
router.get('/stories', (req, res) => {
  res.json({ message: 'Lista de stories' });
});
router.post('/stories', (req, res) => {
  res.json({ message: 'Criar story' });
});
router.get('/stories/:id', (req, res) => {
  res.json({ message: 'Detalhes do story' });
});
router.delete('/stories/:id', (req, res) => {
  res.json({ message: 'Deletar story' });
});
router.post('/stories/:id/view', (req, res) => {
  res.json({ message: 'Visualizar story' });
});

// Eventos
router.get('/events', (req, res) => {
  res.json({ message: 'Lista de eventos' });
});
router.post('/events', (req, res) => {
  res.json({ message: 'Criar evento' });
});
router.get('/events/:id', (req, res) => {
  res.json({ message: 'Detalhes do evento' });
});
router.put('/events/:id', (req, res) => {
  res.json({ message: 'Atualizar evento' });
});
router.delete('/events/:id', (req, res) => {
  res.json({ message: 'Deletar evento' });
});
router.post('/events/:id/attend', (req, res) => {
  res.json({ message: 'Confirmar presença' });
});

// Marketplace
router.get('/products', (req, res) => {
  res.json({ message: 'Lista de produtos' });
});
router.post('/products', (req, res) => {
  res.json({ message: 'Criar produto' });
});
router.get('/products/:id', (req, res) => {
  res.json({ message: 'Detalhes do produto' });
});
router.put('/products/:id', (req, res) => {
  res.json({ message: 'Atualizar produto' });
});
router.delete('/products/:id', (req, res) => {
  res.json({ message: 'Deletar produto' });
});

// Páginas Profissionais
router.get('/professional-pages', (req, res) => {
  res.json({ message: 'Lista de páginas profissionais' });
});
router.post('/professional-pages', (req, res) => {
  res.json({ message: 'Criar página profissional' });
});
router.get('/professional-pages/:id', (req, res) => {
  res.json({ message: 'Detalhes da página' });
});
router.put('/professional-pages/:id', (req, res) => {
  res.json({ message: 'Atualizar página' });
});
router.delete('/professional-pages/:id', (req, res) => {
  res.json({ message: 'Deletar página' });
});

// ADS
router.get('/ads', (req, res) => {
  res.json({ message: 'Lista de anúncios' });
});
router.post('/ads', (req, res) => {
  res.json({ message: 'Criar anúncio' });
});
router.get('/ads/:id', (req, res) => {
  res.json({ message: 'Detalhes do anúncio' });
});
router.put('/ads/:id', (req, res) => {
  res.json({ message: 'Atualizar anúncio' });
});
router.delete('/ads/:id', (req, res) => {
  res.json({ message: 'Deletar anúncio' });
});

// Namoro
router.get('/dating/matches', (req, res) => {
  res.json({ message: 'Lista de matches' });
});
router.post('/dating/like', (req, res) => {
  res.json({ message: 'Dar like' });
});
router.post('/dating/:id/accept', (req, res) => {
  res.json({ message: 'Aceitar match' });
});
router.delete('/dating/:id/reject', (req, res) => {
  res.json({ message: 'Rejeitar match' });
});

// Orações
router.get('/prayers', (req, res) => {
  res.json({ message: 'Lista de pedidos de oração' });
});
router.post('/prayers', (req, res) => {
  res.json({ message: 'Criar pedido de oração' });
});
router.post('/prayers/:id/pray', (req, res) => {
  res.json({ message: 'Orar pelo pedido' });
});

// Hinário
router.get('/hinario', (req, res) => {
  res.json({ message: 'Lista de hinos' });
});
router.get('/hinario/:id', (req, res) => {
  res.json({ message: 'Detalhes do hino' });
});
router.post('/hinario/:id/favorite', (req, res) => {
  res.json({ message: 'Adicionar favorito' });
});
router.delete('/hinario/:id/favorite', (req, res) => {
  res.json({ message: 'Remover favorito' });
});

// Bíblia
router.get('/bible/books', (req, res) => {
  res.json({ message: 'Lista de livros' });
});
router.get('/bible/:book/:chapter', (req, res) => {
  res.json({ message: 'Versículos' });
});
router.get('/bible/search', (req, res) => {
  res.json({ message: 'Buscar versículos' });
});
router.get('/bible/verse-of-day', (req, res) => {
  res.json({ message: 'Versículo do dia' });
});

// Notificações
router.get('/notifications', (req, res) => {
  res.json({ message: 'Lista de notificações' });
});
router.put('/notifications/:id/read', (req, res) => {
  res.json({ message: 'Marcar como lida' });
});
router.put('/notifications/read-all', (req, res) => {
  res.json({ message: 'Marcar todas como lidas' });
});

// Denúncias
router.post('/reports', (req, res) => {
  res.json({ message: 'Criar denúncia' });
});

// Upload
router.post('/upload', (req, res) => {
  res.json({ message: 'Upload de arquivo' });
});

module.exports = router;
