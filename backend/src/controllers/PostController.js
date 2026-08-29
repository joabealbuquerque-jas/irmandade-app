const { Post, Comment, Like } = require('../models/Post');
const User = require('../models/User');

class PostController {
  async create(req, res) {
    try {
      const { content, type, media_urls, link_url, poll_options, is_story } = req.body;
      const userId = req.user.id;

      const post = await Post.create({
        user_id: userId,
        content,
        type: type || 'text',
        media_urls: media_urls || [],
        link_url,
        poll_options: poll_options || [],
        is_story: is_story || false
      });

      res.status(201).json({
        message: 'Post criado com sucesso',
        post: {
          id: post.id,
          content: post.content,
          type: post.type,
          media_urls: post.media_urls,
          link_url: post.link_url,
          poll_options: post.poll_options,
          is_story: post.is_story,
          created_at: post.created_at
        }
      });
    } catch (error) {
      console.error('Erro ao criar post:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async index(req, res) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const userId = req.user.id;

      const posts = await Post.findFeed(userId, parseInt(limit), parseInt(offset));

      // Buscar informações dos usuários
      const postsWithUsers = await Promise.all(posts.map(async (post) => {
        const user = await User.findById(post.user_id);
        const likesCount = await Like.countByPost(post.id, 'like');
        const prayersCount = await Like.countByPost(post.id, 'prayer');
        const commentsCount = await Comment.findByPost(post.id, 1, 0).then(c => c.length);

        return {
          id: post.id,
          content: post.content,
          type: post.type,
          media_urls: post.media_urls,
          link_url: post.link_url,
          poll_options: post.poll_options,
          is_story: post.is_story,
          likes_count: likesCount,
          prayers_count: prayersCount,
          comments_count: commentsCount,
          created_at: post.created_at,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url,
            role: user.role
          }
        };
      }));

      res.json(postsWithUsers);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      const user = await User.findById(post.user_id);
      const likesCount = await Like.countByPost(post.id, 'like');
      const prayersCount = await Like.countByPost(post.id, 'prayer');
      const comments = await Comment.findByPost(post.id, 20, 0);

      res.json({
        id: post.id,
        content: post.content,
        type: post.type,
        media_urls: post.media_urls,
        link_url: post.link_url,
        poll_options: post.poll_options,
        is_story: post.is_story,
        likes_count: likesCount,
        prayers_count: prayersCount,
        created_at: post.created_at,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar_url: user.avatar_url,
          role: user.role
        },
        comments: comments.map(comment => ({
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at
        }))
      });
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { content, media_urls, link_url, poll_options } = req.body;
      const userId = req.user.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      if (post.user_id !== userId) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      const updatedPost = await Post.update(id, {
        content,
        media_urls,
        link_url,
        poll_options
      });

      res.json({
        message: 'Post atualizado com sucesso',
        post: updatedPost
      });
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      if (post.user_id !== userId) {
        return res.status(403).json({ error: 'Não autorizado' });
      }

      await Post.delete(id);

      res.json({ message: 'Post deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async like(req, res) {
    try {
      const { id } = req.params;
      const { type = 'like' } = req.body;
      const userId = req.user.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      // Verificar se já curtiu
      const existingLike = await Like.findByUser(userId, id, type);

      if (existingLike) {
        // Remover like
        await Like.delete(userId, id, type);
        res.json({ message: `${type === 'like' ? 'Like' : 'Oração'} removido` });
      } else {
        // Adicionar like
        await Like.create({
          user_id: userId,
          post_id: id,
          type
        });
        res.json({ message: `${type === 'like' ? 'Like' : 'Oração'} adicionado` });
      }
    } catch (error) {
      console.error('Erro ao curtir:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async comment(req, res) {
    try {
      const { id } = req.params;
      const { content, parent_id } = req.body;
      const userId = req.user.id;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      const comment = await Comment.create({
        post_id: id,
        user_id: userId,
        content,
        parent_id
      });

      res.status(201).json({
        message: 'Comentário adicionado',
        comment: {
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at
        }
      });
    } catch (error) {
      console.error('Erro ao comentar:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async comments(req, res) {
    try {
      const { id } = req.params;
      const { limit = 20, offset = 0 } = req.query;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: 'Post não encontrado' });
      }

      const comments = await Comment.findByPost(id, parseInt(limit), parseInt(offset));

      const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
        const user = await User.findById(comment.user_id);
        return {
          id: comment.id,
          content: comment.content,
          parent_id: comment.parent_id,
          created_at: comment.created_at,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            avatar_url: user.avatar_url,
            role: user.role
          }
        };
      }));

      res.json(commentsWithUsers);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new PostController();
