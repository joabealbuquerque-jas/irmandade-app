const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateTokens } = require('../utils/jwt');

class AuthController {
  async register(req, res) {
    try {
      const { name, username, email, cpf, phone, password, congregation, role, baptism_date, city, state } = req.body;

      // Verificar se usuário já existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail já cadastrado' });
      }

      const existingCpf = await User.findByCpf(cpf);
      if (existingCpf) {
        return res.status(400).json({ error: 'CPF já cadastrado' });
      }

      const existingUsername = await User.findByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: 'Nome de usuário já existe' });
      }

      // Hash da senha
      const password_hash = await bcrypt.hash(password, 10);

      // Criar usuário
      const user = await User.create({
        name,
        username,
        email,
        cpf,
        phone,
        password_hash,
        congregation,
        role: role || 'member',
        baptism_date,
        city,
        state,
        status: 'pending'
      });

      // Gerar tokens
      const { accessToken, refreshToken } = generateTokens(user.id);

      // Salvar refresh token
      await knex('refresh_tokens').insert({
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status
        },
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuário
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verificar senha
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Verificar status
      if (user.status === 'blocked') {
        return res.status(403).json({ error: 'Conta bloqueada' });
      }

      if (user.status === 'pending') {
        return res.status(403).json({ error: 'Conta pendente de aprovação' });
      }

      // Gerar tokens
      const { accessToken, refreshToken } = generateTokens(user.id);

      // Salvar refresh token
      await knex('refresh_tokens').insert({
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      // Atualizar último login
      await User.update(user.id, { last_login: new Date() });

      res.json({
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url
        },
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      // Verificar se token existe
      const storedToken = await knex('refresh_tokens')
        .where({ token: refreshToken })
        .first();

      if (!storedToken) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      // Verificar expiração
      if (new Date(storedToken.expires_at) < new Date()) {
        await knex('refresh_tokens').where({ id: storedToken.id }).del();
        return res.status(401).json({ error: 'Token expirado' });
      }

      // Verificar se foi revogado
      if (storedToken.is_revoked) {
        return res.status(401).json({ error: 'Token revogado' });
      }

      // Gerar novos tokens
      const tokens = generateTokens(storedToken.user_id);

      // Deletar token antigo
      await knex('refresh_tokens').where({ id: storedToken.id }).del();

      // Salvar novo token
      await knex('refresh_tokens').insert({
        user_id: storedToken.user_id,
        token: tokens.refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      res.json(tokens);
    } catch (error) {
      console.error('Erro no refresh token:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      // Deletar refresh token
      await knex('refresh_tokens').where({ token: refreshToken }).del();

      res.json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      console.error('Erro no logout:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new AuthController();
