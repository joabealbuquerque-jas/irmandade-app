const User = require('../models/User');

class UserController {
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({
        id: user.id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        avatar_url: user.avatar_url,
        congregation: user.congregation,
        role: user.role,
        baptism_date: user.baptism_date,
        city: user.city,
        state: user.state,
        created_at: user.created_at
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, bio, congregation, baptism_date, city, state } = req.body;

      // Verificar se é o próprio usuário
      if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      const user = await User.update(id, {
        name,
        bio,
        congregation,
        baptism_date,
        city,
        state
      });

      res.json({
        message: 'Perfil atualizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          bio: user.bio,
          avatar_url: user.avatar_url,
          congregation: user.congregation,
          role: user.role,
          baptism_date: user.baptism_date,
          city: user.city,
          state: user.state
        }
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async search(req, res) {
    try {
      const { q, limit = 20, offset = 0 } = req.query;

      if (!q) {
        return res.status(400).json({ error: 'Termo de busca é obrigatório' });
      }

      const users = await User.search(q, parseInt(limit), parseInt(offset));

      res.json(users.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url,
        congregation: user.congregation,
        role: user.role
      })));
    } catch (error) {
      console.error('Erro na busca:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async me(req, res) {
    try {
      const user = req.user;

      res.json({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar_url: user.avatar_url,
        congregation: user.congregation,
        role: user.role,
        baptism_date: user.baptism_date,
        city: user.city,
        state: user.state,
        is_professional: user.is_professional,
        two_factor_enabled: user.two_factor_enabled,
        created_at: user.created_at
      });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new UserController();
