const knex = require('../config/knexfile')[process.env.NODE_ENV || 'development'];

class Post {
  static async create(data) {
    const [post] = await knex('posts').insert(data).returning('*');
    return post;
  }

  static async findById(id) {
    return knex('posts').where({ id }).first();
  }

  static async findByUser(userId, limit = 20, offset = 0) {
    return knex('posts')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async findFeed(userId, limit = 50, offset = 0) {
    return knex('posts')
      .whereIn('user_id', function() {
        this.select('following_id').from('followers').where('follower_id', userId);
      })
      .orWhere({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async update(id, data) {
    const [post] = await knex('posts').where({ id }).update(data).returning('*');
    return post;
  }

  static async delete(id) {
    return knex('posts').where({ id }).del();
  }
}

class Comment {
  static async create(data) {
    const [comment] = await knex('comments').insert(data).returning('*');
    return comment;
  }

  static async findByPost(postId, limit = 20, offset = 0) {
    return knex('comments')
      .where({ post_id: postId })
      .orderBy('created_at', 'asc')
      .limit(limit)
      .offset(offset);
  }

  static async update(id, data) {
    const [comment] = await knex('comments').where({ id }).update(data).returning('*');
    return comment;
  }

  static async delete(id) {
    return knex('comments').where({ id }).del();
  }
}

class Like {
  static async create(data) {
    const [like] = await knex('likes').insert(data).returning('*');
    return like;
  }

  static async findByPost(postId, type = 'like') {
    return knex('likes').where({ post_id: postId, type });
  }

  static async findByUser(userId, postId, type = 'like') {
    return knex('likes')
      .where({ user_id: userId, post_id: postId, type })
      .first();
  }

  static async delete(userId, postId, type = 'like') {
    return knex('likes')
      .where({ user_id: userId, post_id: postId, type })
      .del();
  }

  static async countByPost(postId, type = 'like') {
    const result = await knex('likes')
      .where({ post_id: postId, type })
      .count('id')
      .first();
    return parseInt(result.count);
  }
}

module.exports = { Post, Comment, Like };
