const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Limpar todas as tabelas
  await knex('refresh_tokens').del();
  await knex('reports').del();
  await knex('matches').del();
  await knex('ads').del();
  await knex('professional_pages').del();
  await knex('products').del();
  await knex('prayer_interactions').del();
  await knex('prayer_requests').del();
  await knex('notifications').del();
  await knex('messages').del();
  await knex('conversation_participants').del();
  await knex('conversations').del();
  await knex('story_views').del();
  await knex('stories').del();
  await knex('event_attendees').del();
  await knex('events').del();
  await knex('group_posts').del();
  await knex('group_members').del();
  await knex('groups').del();
  await knex('likes').del();
  await knex('comments').del();
  await knex('posts').del();
  await knex('users').del();

  // Inserir usuários de teste
  const passwordHash = await bcrypt.hash('12345678', 10);
  
  await knex('users').insert([
    {
      name: 'João Silva',
      username: 'joao.silva',
      email: 'joao@email.com',
      cpf: '12345678901',
      phone: '(11) 99999-9999',
      password_hash: passwordHash,
      bio: 'Servo de Deus, membro da CCB',
      congregation: 'Congregação Central',
      role: 'member',
      baptism_date: '2020-01-15',
      city: 'São Paulo',
      state: 'SP',
      status: 'approved',
    },
    {
      name: 'Maria Santos',
      username: 'maria.santos',
      email: 'maria@email.com',
      cpf: '12345678902',
      phone: '(11) 99999-9998',
      password_hash: passwordHash,
      bio: 'Serva de Deus',
      congregation: 'Congregação Central',
      role: 'cooperator',
      baptism_date: '2019-05-20',
      city: 'São Paulo',
      state: 'SP',
      status: 'approved',
    },
    {
      name: 'Pedro Oliveira',
      username: 'pedro.oliveira',
      email: 'pedro@email.com',
      cpf: '12345678903',
      phone: '(11) 99999-9997',
      password_hash: passwordHash,
      bio: 'Membro da CCB',
      congregation: 'Congregação Sul',
      role: 'deacon',
      baptism_date: '2018-03-10',
      city: 'São Paulo',
      state: 'SP',
      status: 'approved',
    },
  ]);

  // Inserir posts de teste
  await knex('posts').insert([
    {
      user_id: 1,
      content: 'Paz de Deus, irmãos! Hoje foi um dia abençoado na congregação.',
      type: 'text',
      media_urls: '[]',
      is_story: false,
    },
    {
      user_id: 2,
      content: 'Hino 374 - Santo! Santo! Santo! Que hino lindo!',
      type: 'text',
      media_urls: '[]',
      is_story: false,
    },
    {
      user_id: 3,
      content: 'Culto de oração às 19h. Todos convidados!',
      type: 'text',
      media_urls: '[]',
      is_story: false,
    },
  ]);

  // Inserir grupos de teste
  await knex('groups').insert([
    {
      name: 'Congregação Central',
      description: 'Grupo da congregação central de São Paulo',
      type: 'congregation',
      privacy: 'public',
      owner_id: 1,
      members_count: 150,
    },
    {
      name: 'Jovens CCB',
      description: 'Grupo dos jovens da CCB',
      type: 'age',
      privacy: 'public',
      owner_id: 2,
      members_count: 80,
    },
  ]);

  // Inserir eventos de teste
  await knex('events').insert([
    {
      title: 'Culto Oficial',
      description: 'Culto de domingo na congregação central',
      start_date: '2026-08-30 10:00:00',
      end_date: '2026-08-30 12:00:00',
      location: 'Congregação Central - São Paulo, SP',
      type: 'cult',
      organizer_id: 1,
      is_online: false,
      attendees_count: 50,
    },
    {
      title: 'Reunião de Jovens',
      description: 'Reunião semanal dos jovens',
      start_date: '2026-08-30 19:30:00',
      end_date: '2026-08-30 21:00:00',
      location: 'Congregação Central - São Paulo, SP',
      type: 'reunion',
      organizer_id: 2,
      is_online: false,
      attendees_count: 30,
    },
  ]);

  // Inserir produtos de teste
  await knex('products').insert([
    {
      seller_id: 1,
      title: 'Bíblia de Estudo ARA',
      description: 'Bíblia de estudo completa com notas e comentários',
      price: 89.90,
      currency: 'BRL',
      images: '["https://picsum.photos/400/400"]',
      category: 'books',
      status: 'active',
      views_count: 25,
    },
    {
      seller_id: 2,
      title: 'CD Hinos CCB 2024',
      description: 'CD com os mais recentes hinos da congregação',
      price: 25.00,
      currency: 'BRL',
      images: '["https://picsum.photos/400/401"]',
      category: 'music',
      status: 'active',
      views_count: 15,
    },
  ]);

  // Inserir hinos de teste
  await knex('hinos').insert([
    {
      numero: 1,
      titulo: 'Cristo, meu Mestre',
      tom: 'Dó Maior',
      categoria: 'Adoração',
      letra: 'Cristo, meu Mestre, a Ti eu clamo\nDá-me a Tua paz, ó Senhor\nDá-me a Tua graça e salvação\nE vida eterna, ó Salvador',
    },
    {
      numero: 2,
      titulo: 'De Deus Tu És Eleita',
      tom: 'Si Bemol',
      categoria: 'Adoração',
      letra: 'De Deus tu és eleita\nÓ alma que chora\nVem a Cristo, vem agora\nEle te consola',
    },
    {
      numero: 3,
      titulo: 'Faz-nos Ouvir Tua Voz',
      tom: 'Mi Bemol',
      categoria: 'Oração',
      letra: 'Faz-nos ouvir Tua voz\nÓ Senhor, ó Senhor\nPara que nós conheçamos\nO Teu amor, o Teu amor',
    },
  ]);

  // Inserir livros da bíblia de teste
  await knex('bible_books').insert([
    { nome: 'Gênesis', abreviatura: 'Gn', testamento: 'antigo', capitulos: 50 },
    { nome: 'Êxodo', abreviatura: 'Êx', testamento: 'antigo', capitulos: 40 },
    { nome: 'Salmos', abreviatura: 'Sl', testamento: 'antigo', capitulos: 150 },
    { nome: 'Provérbios', abreviatura: 'Pv', testamento: 'antigo', capitulos: 31 },
    { nome: 'Isaías', abreviatura: 'Is', testamento: 'antigo', capitulos: 66 },
    { nome: 'Mateus', abreviatura: 'Mt', testamento: 'novo', capitulos: 28 },
    { nome: 'Marcos', abreviatura: 'Mc', testamento: 'novo', capitulos: 16 },
    { nome: 'Lucas', abreviatura: 'Lc', testamento: 'novo', capitulos: 24 },
    { nome: 'João', abreviatura: 'Jo', testamento: 'novo', capitulos: 21 },
    { nome: 'Atos', abreviatura: 'At', testamento: 'novo', capitulos: 28 },
    { nome: 'Romanos', abreviatura: 'Rm', testamento: 'novo', capitulos: 16 },
    { nome: 'Apocalipse', abreviatura: 'Ap', testamento: 'novo', capitulos: 22 },
  ]);

  console.log('Seed executado com sucesso!');
};
