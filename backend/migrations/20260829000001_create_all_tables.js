exports.up = function(knex) {
  // Tabela de Usuários
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('username', 50).unique().notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('cpf', 11).unique().notNullable();
    table.string('phone', 15);
    table.string('password_hash', 255).notNullable();
    table.text('bio');
    table.string('avatar_url', 255);
    table.string('congregation', 100);
    table.enu('role', ['member', 'cooperator', 'deacon', 'elder']).defaultTo('member');
    table.date('baptism_date');
    table.string('city', 100);
    table.string('state', 2);
    table.enu('status', ['pending', 'approved', 'rejected', 'blocked']).defaultTo('pending');
    table.boolean('is_professional').defaultTo(false);
    table.boolean('two_factor_enabled').defaultTo(false);
    table.timestamp('last_login');
    table.timestamps(true, true);
  })
  
  // Tabela de Posts
  .createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('content');
    table.enu('type', ['text', 'image', 'video', 'audio', 'link', 'poll']).defaultTo('text');
    table.jsonb('media_urls').defaultTo('[]');
    table.string('link_url', 255);
    table.jsonb('poll_options').defaultTo('[]');
    table.boolean('is_story').defaultTo(false);
    table.boolean('is_archived').defaultTo(false);
    table.timestamps(true, true);
  })

  // Tabela de Comentários
  .createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('content').notNullable();
    table.integer('parent_id').unsigned().references('id').inTable('comments').onDelete('CASCADE');
    table.timestamps(true, true);
  })

  // Tabela de Likes (Curtidas)
  .createTable('likes', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE');
    table.integer('comment_id').unsigned().references('id').inTable('comments').onDelete('CASCADE');
    table.enu('type', ['like', 'prayer']).defaultTo('like');
    table.timestamps(true, true);
    table.unique(['user_id', 'post_id', 'type']);
  })

  // Tabela de Seguidores
  .createTable('followers', (table) => {
    table.increments('id').primary();
    table.integer('follower_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('following_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enu('status', ['pending', 'accepted']).defaultTo('accepted');
    table.timestamps(true, true);
    table.unique(['follower_id', 'following_id']);
  })

  // Tabela de Grupos
  .createTable('groups', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.text('description');
    table.string('cover_url', 255);
    table.enu('type', ['congregation', 'region', 'age', 'interest', 'study', 'prayer', 'admin']).defaultTo('interest');
    table.enu('privacy', ['public', 'private']).defaultTo('public');
    table.integer('owner_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('members_count').defaultTo(0);
    table.timestamps(true, true);
  })

  // Tabela de Membros de Grupos
  .createTable('group_members', (table) => {
    table.increments('id').primary();
    table.integer('group_id').unsigned().notNullable().references('id').inTable('groups').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enu('role', ['member', 'moderator', 'admin']).defaultTo('member');
    table.timestamps(true, true);
    table.unique(['group_id', 'user_id']);
  })

  // Tabela de Posts em Grupos
  .createTable('group_posts', (table) => {
    table.increments('id').primary();
    table.integer('group_id').unsigned().notNullable().references('id').inTable('groups').onDelete('CASCADE');
    table.integer('post_id').unsigned().notNullable().references('id').inTable('posts').onDelete('CASCADE');
    table.timestamps(true, true);
  })

  // Tabela de Eventos
  .createTable('events', (table) => {
    table.increments('id').primary();
    table.string('title', 200).notNullable();
    table.text('description');
    table.datetime('start_date').notNullable();
    table.datetime('end_date');
    table.string('location', 255);
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.string('cover_url', 255);
    table.enu('type', ['cult', 'reunion', 'convention', 'baptism', 'communion', 'workshop', 'social']).defaultTo('cult');
    table.integer('organizer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('group_id').unsigned().references('id').inTable('groups').onDelete('SET NULL');
    table.boolean('is_online').defaultTo(false);
    table.string('stream_url', 255);
    table.integer('attendees_count').defaultTo(0);
    table.timestamps(true, true);
  })

  // Tabela de Participantes de Eventos
  .createTable('event_attendees', (table) => {
    table.increments('id').primary();
    table.integer('event_id').unsigned().notNullable().references('id').inTable('events').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enu('status', ['going', 'interested', 'not_going']).defaultTo('going');
    table.timestamps(true, true);
    table.unique(['event_id', 'user_id']);
  })

  // Tabela de Stories
  .createTable('stories', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('media_url', 255).notNullable();
    table.enu('type', ['image', 'video', 'text']).defaultTo('image');
    table.text('content');
    table.jsonb('stickers').defaultTo('[]');
    table.integer('views_count').defaultTo(0);
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true);
  })

  // Tabela de Visualizações de Stories
  .createTable('story_views', (table) => {
    table.increments('id').primary();
    table.integer('story_id').unsigned().notNullable().references('id').inTable('stories').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
    table.unique(['story_id', 'user_id']);
  })

  // Tabela de Conversas
  .createTable('conversations', (table) => {
    table.increments('id').primary();
    table.enu('type', ['private', 'group']).defaultTo('private');
    table.string('title', 100);
    table.string('avatar_url', 255);
    table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.timestamps(true, true);
  })

  // Tabela de Participantes de Conversas
  .createTable('conversation_participants', (table) => {
    table.increments('id').primary();
    table.integer('conversation_id').unsigned().notNullable().references('id').inTable('conversations').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enu('role', ['member', 'admin']).defaultTo('member');
    table.timestamp('last_read_at');
    table.timestamps(true, true);
    table.unique(['conversation_id', 'user_id']);
  })

  // Tabela de Mensagens
  .createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('conversation_id').unsigned().notNullable().references('id').inTable('conversations').onDelete('CASCADE');
    table.integer('sender_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('content');
    table.enu('type', ['text', 'image', 'video', 'audio', 'document', 'voice']).defaultTo('text');
    table.string('media_url', 255);
    table.boolean('is_read').defaultTo(false);
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
  })

  // Tabela de Notificações
  .createTable('notifications', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('sender_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.enu('type', ['like', 'comment', 'prayer', 'follow', 'message', 'group', 'event', 'match', 'system']).notNullable();
    table.text('content').notNullable();
    table.string('reference_type', 50);
    table.integer('reference_id').unsigned();
    table.boolean('is_read').defaultTo(false);
    table.timestamps(true, true);
  })

  // Tabela de Pedidos de Oração
  .createTable('prayer_requests', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('content').notNullable();
    table.enu('category', ['health', 'family', 'work', 'spiritual', 'studies', 'other']).defaultTo('other');
    table.enu('visibility', ['public', 'private']).defaultTo('public');
    table.boolean('is_answered').defaultTo(false);
    table.text('testimony');
    table.integer('prayers_count').defaultTo(0);
    table.timestamps(true, true);
  })

  // Tabela de Orações em Pedidos
  .createTable('prayer_interactions', (table) => {
    table.increments('id').primary();
    table.integer('prayer_request_id').unsigned().notNullable().references('id').inTable('prayer_requests').onDelete('CASCADE');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enu('type', ['praying', 'amen']).defaultTo('praying');
    table.timestamps(true, true);
    table.unique(['prayer_request_id', 'user_id', 'type']);
  })

  // Tabela de Marketplace (Produtos)
  .createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('seller_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('title', 200).notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.string('currency', 3).defaultTo('BRL');
    table.jsonb('images').defaultTo('[]');
    table.enu('category', ['books', 'clothing', 'accessories', 'music', 'art', 'services', 'food', 'other']).defaultTo('other');
    table.enu('status', ['active', 'sold', 'paused', 'removed']).defaultTo('active');
    table.integer('views_count').defaultTo(0);
    table.timestamps(true, true);
  })

  // Tabela de Páginas Profissionais
  .createTable('professional_pages', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').unique();
    table.string('business_name', 100).notNullable();
    table.text('description');
    table.string('logo_url', 255);
    table.string('cover_url', 255);
    table.string('phone', 15);
    table.string('whatsapp', 15);
    table.string('website', 255);
    table.string('instagram', 100);
    table.string('facebook', 100);
    table.string('youtube', 100);
    table.string('city', 100);
    table.string('state', 2);
    table.enu('plan', ['basic', 'professional', 'premium']).defaultTo('basic');
    table.enu('status', ['active', 'inactive', 'suspended']).defaultTo('active');
    table.date('plan_expires_at');
    table.timestamps(true, true);
  })

  // Tabela de Anúncios (ADS)
  .createTable('ads', (table) => {
    table.increments('id').primary();
    table.integer('page_id').unsigned().notNullable().references('id').inTable('professional_pages').onDelete('CASCADE');
    table.string('title', 200).notNullable();
    table.text('description');
    table.string('media_url', 255).notNullable();
    table.enu('format', ['feed', 'story', 'sidebar', 'banner', 'reels']).defaultTo('feed');
    table.string('target_url', 255);
    table.jsonb('target_audience').defaultTo('{}');
    table.integer('impressions_count').defaultTo(0);
    table.integer('clicks_count').defaultTo(0);
    table.decimal('budget', 10, 2);
    table.enu('status', ['active', 'paused', 'completed', 'rejected']).defaultTo('active');
    table.date('start_date');
    table.date('end_date');
    table.timestamps(true, true);
  })

  // Tabela de Matches (Namoro)
  .createTable('matches', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('matched_user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enu('status', ['pending', 'matched', 'rejected']).defaultTo('pending');
    table.timestamps(true, true);
    table.unique(['user_id', 'matched_user_id']);
  })

  // Tabela de Denúncias
  .createTable('reports', (table) => {
    table.increments('id').primary();
    table.integer('reporter_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('reported_user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE');
    table.integer('comment_id').unsigned().references('id').inTable('comments').onDelete('CASCADE');
    table.integer('message_id').unsigned().references('id').inTable('messages').onDelete('CASCADE');
    table.enu('reason', ['spam', 'harassment', 'inappropriate', 'false_info', 'impersonation', 'other']).notNullable();
    table.text('description');
    table.enu('status', ['pending', 'reviewed', 'actioned', 'dismissed']).defaultTo('pending');
    table.timestamps(true, true);
  })

  // Tabela de Tokens de Refresh
  .createTable('refresh_tokens', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('token', 255).notNullable();
    table.string('device_info', 255);
    table.string('ip_address', 45);
    table.timestamp('expires_at').notNullable();
    table.boolean('is_revoked').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('refresh_tokens')
    .dropTableIfExists('reports')
    .dropTableIfExists('matches')
    .dropTableIfExists('ads')
    .dropTableIfExists('professional_pages')
    .dropTableIfExists('products')
    .dropTableIfExists('prayer_interactions')
    .dropTableIfExists('prayer_requests')
    .dropTableIfExists('notifications')
    .dropTableIfExists('messages')
    .dropTableIfExists('conversation_participants')
    .dropTableIfExists('conversations')
    .dropTableIfExists('story_views')
    .dropTableIfExists('stories')
    .dropTableIfExists('event_attendees')
    .dropTableIfExists('events')
    .dropTableIfExists('group_posts')
    .dropTableIfExists('group_members')
    .dropTableIfExists('groups')
    .dropTableIfExists('followers')
    .dropTableIfExists('likes')
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
