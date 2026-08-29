const knex = require('../config/knexfile')[process.env.NODE_ENV || 'development'];

class User {
  static async create(data) {
    const [user] = await knex('users').insert(data).returning('*');
    return user;
  }

  static async findById(id) {
    return knex('users').where({ id }).first();
  }

  static async findByEmail(email) {
    return knex('users').where({ email }).first();
  }

  static async findByCpf(cpf) {
    return knex('users').where({ cpf }).first();
  }

  static async findByUsername(username) {
    return knex('users').where({ username }).first();
  }

  static async update(id, data) {
    const [user] = await knex('users').where({ id }).update(data).returning('*');
    return user;
  }

  static async delete(id) {
    return knex('users').where({ id }).del();
  }

  static async search(query, limit = 20, offset = 0) {
    return knex('users')
      .where('name', 'ilike', `%${query}%`)
      .orWhere('username', 'ilike', `%${query}%`)
      .orWhere('congregation', 'ilike', `%${query}%`)
      .limit(limit)
      .offset(offset);
  }
}

module.exports = User;
