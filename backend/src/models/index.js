const knex = require('../config/knexfile')[process.env.NODE_ENV || 'development'];

class Follower {
  static async create(data) {
    const [follower] = await knex('followers').insert(data).returning('*');
    return follower;
  }

  static async findFollowers(userId) {
    return knex('followers')
      .join('users', 'followers.follower_id', 'users.id')
      .where({ following_id: userId })
      .select('users.*', 'followers.created_at as followed_at');
  }

  static async findFollowing(userId) {
    return knex('followers')
      .join('users', 'followers.following_id', 'users.id')
      .where({ follower_id: userId })
      .select('users.*', 'followers.created_at as followed_at');
  }

  static async delete(followerId, followingId) {
    return knex('followers')
      .where({ follower_id: followerId, following_id: followingId })
      .del();
  }

  static async countFollowers(userId) {
    const result = await knex('followers')
      .where({ following_id: userId })
      .count('id')
      .first();
    return parseInt(result.count);
  }

  static async countFollowing(userId) {
    const result = await knex('followers')
      .where({ follower_id: userId })
      .count('id')
      .first();
    return parseInt(result.count);
  }
}

class Group {
  static async create(data) {
    const [group] = await knex('groups').insert(data).returning('*');
    return group;
  }

  static async findById(id) {
    return knex('groups').where({ id }).first();
  }

  static async findAll(limit = 20, offset = 0) {
    return knex('groups')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async update(id, data) {
    const [group] = await knex('groups').where({ id }).update(data).returning('*');
    return group;
  }

  static async delete(id) {
    return knex('groups').where({ id }).del();
  }

  static async addMember(groupId, userId, role = 'member') {
    const [member] = await knex('group_members')
      .insert({ group_id: groupId, user_id: userId, role })
      .returning('*');
    return member;
  }

  static async removeMember(groupId, userId) {
    return knex('group_members')
      .where({ group_id: groupId, user_id: userId })
      .del();
  }

  static async findMembers(groupId) {
    return knex('group_members')
      .join('users', 'group_members.user_id', 'users.id')
      .where({ group_id: groupId })
      .select('users.*', 'group_members.role', 'group_members.created_at as joined_at');
  }
}

class Event {
  static async create(data) {
    const [event] = await knex('events').insert(data).returning('*');
    return event;
  }

  static async findById(id) {
    return knex('events').where({ id }).first();
  }

  static async findAll(limit = 20, offset = 0) {
    return knex('events')
      .orderBy('start_date', 'asc')
      .limit(limit)
      .offset(offset);
  }

  static async update(id, data) {
    const [event] = await knex('events').where({ id }).update(data).returning('*');
    return event;
  }

  static async delete(id) {
    return knex('events').where({ id }).del();
  }

  static async addAttendee(eventId, userId, status = 'going') {
    const [attendee] = await knex('event_attendees')
      .insert({ event_id: eventId, user_id: userId, status })
      .returning('*');
    return attendee;
  }

  static async removeAttendee(eventId, userId) {
    return knex('event_attendees')
      .where({ event_id: eventId, user_id: userId })
      .del();
  }

  static async findAttendees(eventId) {
    return knex('event_attendees')
      .join('users', 'event_attendees.user_id', 'users.id')
      .where({ event_id: eventId })
      .select('users.*', 'event_attendees.status');
  }
}

class Story {
  static async create(data) {
    const [story] = await knex('stories').insert(data).returning('*');
    return story;
  }

  static async findById(id) {
    return knex('stories').where({ id }).first();
  }

  static async findByUser(userId) {
    return knex('stories')
      .where({ user_id: userId })
      .andWhere('expires_at', '>', new Date())
      .orderBy('created_at', 'desc');
  }

  static async findActiveStories() {
    return knex('stories')
      .where('expires_at', '>', new Date())
      .orderBy('created_at', 'desc');
  }

  static async delete(id) {
    return knex('stories').where({ id }).del();
  }

  static async addView(storyId, userId) {
    const [view] = await knex('story_views')
      .insert({ story_id: storyId, user_id: userId })
      .returning('*');
    return view;
  }

  static async findViewers(storyId) {
    return knex('story_views')
      .join('users', 'story_views.user_id', 'users.id')
      .where({ story_id: storyId })
      .select('users.*', 'story_views.created_at as viewed_at');
  }
}

class Message {
  static async createConversation(data) {
    const [conversation] = await knex('conversations').insert(data).returning('*');
    return conversation;
  }

  static async findConversationById(id) {
    return knex('conversations').where({ id }).first();
  }

  static async findUserConversations(userId) {
    return knex('conversations')
      .join('conversation_participants', 'conversations.id', 'conversation_participants.conversation_id')
      .where({ 'conversation_participants.user_id': userId })
      .orderBy('conversations.updated_at', 'desc');
  }

  static async addParticipant(conversationId, userId, role = 'member') {
    const [participant] = await knex('conversation_participants')
      .insert({ conversation_id: conversationId, user_id: userId, role })
      .returning('*');
    return participant;
  }

  static async removeParticipant(conversationId, userId) {
    return knex('conversation_participants')
      .where({ conversation_id: conversationId, user_id: userId })
      .del();
  }

  static async createMessage(data) {
    const [message] = await knex('messages').insert(data).returning('*');
    return message;
  }

  static async findMessages(conversationId, limit = 50, offset = 0) {
    return knex('messages')
      .where({ conversation_id: conversationId })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async markAsRead(messageId) {
    const [message] = await knex('messages')
      .where({ id: messageId })
      .update({ is_read: true })
      .returning('*');
    return message;
  }
}

class Notification {
  static async create(data) {
    const [notification] = await knex('notifications').insert(data).returning('*');
    return notification;
  }

  static async findByUser(userId, limit = 20, offset = 0) {
    return knex('notifications')
      .where({ user_id: userId })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async markAsRead(id) {
    const [notification] = await knex('notifications')
      .where({ id })
      .update({ is_read: true })
      .returning('*');
    return notification;
  }

  static async markAllAsRead(userId) {
    return knex('notifications')
      .where({ user_id: userId })
      .update({ is_read: true });
  }

  static async countUnread(userId) {
    const result = await knex('notifications')
      .where({ user_id: userId, is_read: false })
      .count('id')
      .first();
    return parseInt(result.count);
  }
}

class PrayerRequest {
  static async create(data) {
    const [prayer] = await knex('prayer_requests').insert(data).returning('*');
    return prayer;
  }

  static async findById(id) {
    return knex('prayer_requests').where({ id }).first();
  }

  static async findAll(limit = 20, offset = 0) {
    return knex('prayer_requests')
      .where({ visibility: 'public' })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async update(id, data) {
    const [prayer] = await knex('prayer_requests').where({ id }).update(data).returning('*');
    return prayer;
  }

  static async delete(id) {
    return knex('prayer_requests').where({ id }).del();
  }

  static async addInteraction(prayerId, userId, type = 'praying') {
    const [interaction] = await knex('prayer_interactions')
      .insert({ prayer_request_id: prayerId, user_id: userId, type })
      .returning('*');
    return interaction;
  }

  static async countPrayers(prayerId) {
    const result = await knex('prayer_interactions')
      .where({ prayer_request_id: prayerId })
      .count('id')
      .first();
    return parseInt(result.count);
  }
}

class Product {
  static async create(data) {
    const [product] = await knex('products').insert(data).returning('*');
    return product;
  }

  static async findById(id) {
    return knex('products').where({ id }).first();
  }

  static async findAll(limit = 20, offset = 0) {
    return knex('products')
      .where({ status: 'active' })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async findBySeller(sellerId) {
    return knex('products')
      .where({ seller_id: sellerId })
      .orderBy('created_at', 'desc');
  }

  static async update(id, data) {
    const [product] = await knex('products').where({ id }).update(data).returning('*');
    return product;
  }

  static async delete(id) {
    return knex('products').where({ id }).del();
  }
}

class ProfessionalPage {
  static async create(data) {
    const [page] = await knex('professional_pages').insert(data).returning('*');
    return page;
  }

  static async findByUserId(userId) {
    return knex('professional_pages').where({ user_id: userId }).first();
  }

  static async findById(id) {
    return knex('professional_pages').where({ id }).first();
  }

  static async update(id, data) {
    const [page] = await knex('professional_pages').where({ id }).update(data).returning('*');
    return page;
  }

  static async delete(id) {
    return knex('professional_pages').where({ id }).del();
  }
}

class Ad {
  static async create(data) {
    const [ad] = await knex('ads').insert(data).returning('*');
    return ad;
  }

  static async findById(id) {
    return knex('ads').where({ id }).first();
  }

  static async findByPage(pageId) {
    return knex('ads')
      .where({ page_id: pageId })
      .orderBy('created_at', 'desc');
  }

  static async findActive() {
    return knex('ads')
      .where({ status: 'active' })
      .andWhere('end_date', '>', new Date());
  }

  static async update(id, data) {
    const [ad] = await knex('ads').where({ id }).update(data).returning('*');
    return ad;
  }

  static async delete(id) {
    return knex('ads').where({ id }).del();
  }

  static async incrementImpressions(id) {
    return knex('ads')
      .where({ id })
      .increment('impressions_count', 1);
  }

  static async incrementClicks(id) {
    return knex('ads')
      .where({ id })
      .increment('clicks_count', 1);
  }
}

class Match {
  static async create(data) {
    const [match] = await knex('matches').insert(data).returning('*');
    return match;
  }

  static async findById(id) {
    return knex('matches').where({ id }).first();
  }

  static async findByUser(userId) {
    return knex('matches')
      .where({ user_id: userId })
      .orWhere({ matched_user_id: userId })
      .orderBy('created_at', 'desc');
  }

  static async updateStatus(id, status) {
    const [match] = await knex('matches')
      .where({ id })
      .update({ status })
      .returning('*');
    return match;
  }

  static async delete(id) {
    return knex('matches').where({ id }).del();
  }
}

class Report {
  static async create(data) {
    const [report] = await knex('reports').insert(data).returning('*');
    return report;
  }

  static async findById(id) {
    return knex('reports').where({ id }).first();
  }

  static async findAll(limit = 20, offset = 0) {
    return knex('reports')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async updateStatus(id, status) {
    const [report] = await knex('reports')
      .where({ id })
      .update({ status })
      .returning('*');
    return report;
  }
}

module.exports = {
  Follower,
  Group,
  Event,
  Story,
  Message,
  Notification,
  PrayerRequest,
  Product,
  ProfessionalPage,
  Ad,
  Match,
  Report,
};
