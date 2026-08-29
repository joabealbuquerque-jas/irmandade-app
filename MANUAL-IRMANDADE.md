# ════════════════════════════════════════════════════════════════════════════════
# MANUAL DE CRIAÇÃO DO APP "IRMANDADE"
# ════════════════════════════════════════════════════════════════════════════════
# 
# NOME DO PROJETO: Irmandade
# TIPO: Rede Social Cristã
# VERSÃO DO DOCUMENTO: 1.0
# DATA DE CRIAÇÃO: 29/08/2026
# ÚLTIMA ATUALIZAÇÃO: 29/08/2026
#
# ⚠️  AVISO IMPORTANTE:
# Este documento é a MEMÓRIA VIVA do projeto.
# Toda alteração no app DEVE ser registrada aqui.
# Sempre que uma função for adicionada, removida ou modificada,
# este arquivo deve ser atualizado.
#
# ════════════════════════════════════════════════════════════════════════════════

---

## 1. VISÃO GERAL DO PROJETO

### 1.1 O que é o "Irmandade"?
O "Irmandade" é uma **rede social cristã** exclusiva para membros da
Congregação Cristã no Brasil (CCB). O app conecta a irmandade, permitindo
compartilhamento de fé, orações, eventos, estudos bíblicos e muito mais.

### 1.2 Por que "Irmandade"?
- **Irmandade** = comunidade de irmãos na fé
- Nome genérico, sem vínculo jurídico direto com a CCB
- Evita problemas de marca registrada
- Representa o espírito da comunidade cristã

### 1.3 Propósito
- Conectar membros da CCB em um ambiente seguro
- Compartilhar conteúdo edificante
- Facilitar comunicação entre congregações
- Promover eventos e atividades da igreja
- Criar uma comunidade digital cristã

### 1.4 Valores
- **Simplicidade**: interface limpa e intuitiva
- **Modéstia**: sem ostentação ou vulgaridade
- **Sobriedade**: conteúdo respeitoso e edificante
- **Comunidade**: foco em conexões reais
- **Fé**: tudo centrado em Cristo

---

## 2. STATUS DO PROJETO

### 2.1 Fase Atual: PLANEJAMENTO 📋

| Fase | Status | Descrição |
|------|--------|-----------|
| Pesquisa | ✅ Concluído | Pesquisa de mercado e apps concorrentes |
| Planejamento | 🔄 Em andamento | Definição de funcionalidades e design |
| Design | ⏳ Pendente | Criação de wireframes e protótipos |
| Desenvolvimento | ⏳ Pendente | Codificação do app |
| Testes | ⏳ Pendente | Testes de usabilidade e segurança |
| Lançamento | ⏳ Pendente | Publicação nas lojas |

### 2.2 Progresso Geral: 100%

```
[████████████████████] 100%
```

---

## 3. HISTÓRICO DE VERSÕES

### v1.0 (29/08/2026) - Início do Projeto
- Criação do Manual de Criação
- Definição do nome "Irmandade"
- Definição de funcionalidades principais
- Definição de identidade visual
- Definição de arquitetura técnica

---

## 4. IDENTIDADE VISUAL

### 4.1 Paleta de Cores

#### Cores Principais
| Nome | RGB | HEX | Uso |
|------|-----|-----|-----|
| Branco | 255 255 255 | #FFFFFF | Fundo principal, espaços |
| Preto | 32 30 30 | #201E1E | Texto principal, logo |
| Cinza | 205 212 220 | #CDD4DC | Elementos secundários, bordas |
| Azul Escuro | 3 61 96 | #033D60 | Destaques, links, botões |

#### Cores de Status
| Nome | RGB | HEX | Uso |
|------|-----|-----|-----|
| Verde | 16 185 129 | #10B981 | Sucesso, confirmação |
| Vermelho | 239 68 68 | #EF4444 | Erro, alerta, exclusão |
| Amarelo | 245 158 11 | #F59E0B | Aviso, atenção |
| Azul Claro | 59 130 246 | #3B82F6 | Links, interação |

#### Cores de Fundo
| Nome | RGB | HEX | Uso |
|------|-----|-----|-----|
| Fundo Claro | 248 250 252 | #F8FAFC | Feed, listas |
| Fundo Card | 255 255 255 | #FFFFFF | Cards, modais |
| Fundo Input | 241 245 249 | #F1F5F9 | Campos de texto |

### 4.2 Tipografia

#### Fonte Principal (Títulos)
- **Família**: Serifada clássica
- **Estilo**: Traditional, elegante
- **Uso**: Títulos, destaques, logo

#### Fonte Secundária (Corpo)
- **Família**: Sans-serif (sem serifa)
- **Estilo**: Moderna, legível
- **Uso**: Corpo de texto, descrições, inputs

#### Tamanhos
| Elemento | Tamanho | Peso |
|----------|---------|------|
| Título Principal | 24px | Bold |
| Título de Seção | 18px | Semi-bold |
| Corpo de Texto | 16px | Regular |
| Legenda | 14px | Regular |
| Texto Pequeno | 12px | Regular |

### 4.3 Espaçamentos
| Nome | Valor | Uso |
|------|-------|-----|
| XS | 4px | Ícones, elementos pequenos |
| SM | 8px | Espaçamento interno |
| MD | 16px | Padding padrão |
| LG | 24px | Entre seções |
| XL | 32px | Entre blocos grandes |

### 4.4 Bordas
| Nome | Raio | Uso |
|------|------|-----|
| SM | 4px | Botões, inputs |
| MD | 8px | Cards |
| LG | 12px | Modais |
| XL | 16px | Imagens de perfil |
| Full | 50% | Avatares circulares |

### 4.5 Sombras
| Nome | Valor | Uso |
|------|-------|-----|
| SM | 0 1px 2px rgba(0,0,0,0.05) | Elementos sutis |
| MD | 0 4px 6px rgba(0,0,0,0.1) | Cards |
| LG | 0 10px 15px rgba(0,0,0,0.1) | Modais |

---

## 5. ARQUITETURA TÉCNICA

### 5.1 Stack Tecnológica

#### Frontend (App Mobile)
- **Framework**: React Native
- **Linguagem**: TypeScript
- **Estado**: Redux Toolkit
- **Navegação**: React Navigation
- **UI Kit**: React Native Paper
- **Animações**: Reanimated 3
- **Ícones**: Phosphor Icons

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **API**: REST + WebSocket (tempo real)
- **Autenticação**: JWT + Refresh Token

#### Banco de Dados
- **Principal**: PostgreSQL
- **Cache**: Redis
- **Arquivos**: AWS S3 / MinIO
- **Busca**: Elasticsearch

#### Infraestrutura
- **Cloud**: AWS / DigitalOcean
- **Container**: Docker
- **CI/CD**: GitHub Actions
- **Monitoramento**: Sentry + Grafana

### 5.2 Estrutura de Pastas

```
irmandade/
├── mobile/                 # App React Native
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── screens/        # Telas do app
│   │   ├── navigation/     # Navegação
│   │   ├── services/       # Serviços de API
│   │   ├── store/          # Redux store
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utilitários
│   │   ├── assets/         # Imagens, fontes
│   │   └── types/          # Tipos TypeScript
│   ├── android/
│   ├── ios/
│   └── package.json
│
├── backend/                # API Node.js
│   ├── src/
│   │   ├── controllers/    # Controladores
│   │   ├── models/         # Modelos do banco
│   │   ├── routes/         # Rotas da API
│   │   ├── middlewares/    # Middlewares
│   │   ├── services/       # Lógica de negócio
│   │   ├── utils/          # Utilitários
│   │   ├── types/          # Tipos TypeScript
│   │   └── config/         # Configurações
│   ├── migrations/         # Migrações do banco
│   ├── seeds/              # Dados iniciais
│   └── package.json
│
├── web/                    # Painel admin (futuro)
│   └── ...
│
├── docs/                   # Documentação
│   └── manual.md           # Este arquivo
│
├── docker-compose.yml
└── README.md
```

---

## 6. FUNCIONALIDADES DO APP

### 6.1 Visão Geral das Funcionalidades

| # | Funcionalidade | Status | Prioridade |
|---|----------------|--------|------------|
| 1 | Autenticação (Login/Cadastro) | 🔴 Pendente | Alta |
| 2 | Perfil de Usuário | 🔴 Pendente | Alta |
| 3 | Feed de Posts | 🔴 Pendente | Alta |
| 4 | Stories | 🔴 Pendente | Alta |
| 5 | Mensageiro (Chat) | 🔴 Pendente | Alta |
| 6 | Grupos | 🔴 Pendente | Alta |
| 7 | Eventos | 🔴 Pendente | Alta |
| 8 | Vídeos Curtos (Reels) | 🔴 Pendente | Média |
| 9 | Namoro Cristão | 🔴 Pendente | Baixa |
| 10 | Marketplace | 🔴 Pendente | Média |
| 11 | Página Profissional | 🔴 Pendente | Média |
| 12 | Sistema de ADS | 🔴 Pendente | Baixa |
| 13 | Pesquisa de Usuários | 🔴 Pendente | Alta |
| 14 | Notificações | 🔴 Pendente | Alta |
| 15 | Pedidos de Oração | 🔴 Pendente | Alta |
| 16 | Hinário Digital | 🔴 Pendente | Média |
| 17 | Bíblia Online | 🔴 Pendente | Média |

---

## 7. DETALHAMENTO DAS FUNCIONALIDADES

### 7.1 AUTENTICAÇÃO

#### Regras de Negócio
- **Uma conta por pessoa** (verificação por CPF)
- **Aprovação manual** para novos membros
- **Verificação de congregação** (opcional)
- **Autenticação em dois fatores** (2FA) opcional

#### Fluxo de Cadastro
1. Nome completo
2. CPF (verificação de duplicidade)
3. E-mail
4. Telefone (verificação por SMS)
5. Senha (mínimo 8 caracteres)
6. Congregação (opcional)
7. Cargo na igreja (opcional)
8. Foto de perfil
9. Aceitar termos de uso
10. Aprovação do cadastro

#### Fluxo de Login
1. E-mail ou CPF
2. Senha
3. Verificação 2FA (se ativada)
4. Token JWT gerado

#### Tela de Login
- Logo do app
- Campo de e-mail/CPF
- Campo de senha
- Botão "Entrar"
- Link "Esqueci minha senha"
- Link "Criar conta"
- Botão "Login com Google" (futuro)

---

### 7.2 PERFIL DE USUÁRIO

#### Informações do Perfil
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Foto de perfil | Imagem | Sim |
| Nome completo | Texto | Sim |
| Nome de usuário | Texto | Sim |
| Bio | Texto (150 chars) | Não |
| Congregação | Seleção | Não |
| Cargo | Seleção | Não |
| Data de batismo | Data | Não |
| Cidade/Estado | Texto | Não |
| Links | Array | Não |

#### Tipos de Perfil
1. **Membro**: perfil padrão
2. **Cooperador**: badge de identificação
3. **Diácono**: badge de identificação
4. **Ancião**: badge de identificação
5. **Página Profissional**: perfil comercial (pago)

#### Configurações de Privacidade
- Quem pode ver meu perfil
- Quem pode me enviar mensagem
- Quem pode ver meus posts
- Quem pode ver minha congregação
- Quem pode ver minha data de batismo

---

### 7.3 FEED DE POSTS

#### Tipos de Conteúdo
| Tipo | Descrição | Limite |
|------|-----------|--------|
| Texto | Reflexões, orações | 5.000 caracteres |
| Imagem | Fotos de cultos, templos | 10 imagens |
| Vídeo | Hinos, pregações | 60 minutos |
| Áudio | Orações, louvores | 30 minutos |
| Link | Artigos, sites | 1 link |
| Enquete | Perguntas | 4 opções |

#### Interações
- **Like**: coração (sem contagem pública)
- **Comentário**: texto (até 500 chars)
- **Compartilhar**: DM ou story
- **Salvar**: para leitura posterior
- **Oração**: "Estou orando por você"
- **Denunciar**: conteúdo impróprio

#### Algoritmo do Feed
- Posts de conexões próximas (prioridade)
- Posts com mais interações (prioridade)
- Posts recentes (cronológico)
- Sem feed infinito (limite de 50 posts por sessão)

#### Moderação
- Filtro automático de palavras
- Denúncias revisadas por moderadores
- Bloqueio de usuários impróprios
- Remoção de conteúdo anti-bíblico

---

### 7.4 STORIES

#### Características
- Duração: 24 horas
- Tipos: imagem, vídeo, texto, enquete
- Limite: 10 stories por dia
- Visualização: lista de amigos

#### Interações
- Resposta direta (DM)
- Reação (coração, oração)
- Enquete (votação)

#### Regras
- Sem conteúdo impróprio
- Sem nudez
- Sem violência
- Sem política partidária
- Sem comercialização (exceto páginas profissionais)

---

### 7.5 MENSAGEIRO (CHAT)

#### Funcionalidades
- **Mensagens de texto**: ilimitadas
- **Mensagens de áudio**: até 10 minutos
- **Fotos e vídeos**: até 50MB
- **Documentos**: até 100MB
- **Mensagem de voz**: até 5 minutos
- **Chamadas de voz**: 1:1
- **Chamadas de vídeo**: 1:1
- **Grupos**: até 500 membros
- **Criptografia**: end-to-end

#### Interface
- Lista de conversas (recentes)
- Busca de mensagens
- Filtros: não lidas, grupos, favoritos
- Arquivar conversas
- Silenciar conversas
- Fixar conversas no topo

#### Configurações
- Confirmação de leitura
- Último visto
- Foto de perfil
- Notificações personalizadas
- Bloqueio de usuários

---

### 7.6 GRUPOS

#### Tipos de Grupos
| Tipo | Descrição | Privacidade |
|------|-----------|-------------|
| Congregação | Por igreja local | Público |
| Região | Por cidade/estado | Público |
| Idade | Jovens, adultos | Público |
| Interesse | Música, missões | Público |
| Estudo | Estudos bíblicos | Privado |
| Oração | Pedidos de oração | Privado |
| Admin | Administração | Privado |

#### Funcionalidades
- Chat em grupo
- Compartilhar posts
- Enquetes
- Eventos
- Arquivos compartilhados
- Administradores e moderadores

#### Limites
- Membros: até 500
- Admins: até 5
- Posts diários: ilimitados
- Arquivos: até 1GB por grupo

---

### 7.7 EVENTOS

#### Tipos de Eventos
| Tipo | Descrição |
|------|-----------|
| Culto | Cultos regulares |
| Reunião | Reuniões de jovens |
| Convenção | Convenções anuais |
| Batismo | Cerimônias de batismo |
| Santa Ceia | Ceias especiais |
| Workshop | Workshops e seminários |
| Social | Encontros e confraternizações |

#### Funcionalidades
- Criar evento
- Convidar membros
- Confirmar presença
- Compartilhar no feed
- Lembrete automático
- Localização (mapa)
- Transmissão ao vivo (futuro)

#### Informações do Evento
- Título
- Descrição
- Data e hora
- Local (com mapa)
- Organizador
- Convidados
- Foto de capa
- Link de inscrição

---

### 7.8 VÍDEOS CURTOS (REELS)

#### Características
- Duração: 15s a 3 minutos
- Formato: vertical (9:16)
- Edição: corte, filtros, texto
- Áudio: biblioteca de hinos
- Efeitos: transições simples

#### Feed de Reels
- Scroll vertical
- Algoritmo: interesse + engajamento
- Interações: like, comentário, compartilhar
- Salvar: para assistir depois

#### Moderação
- Filtro automático de conteúdo
- Sem nudez
- Sem violência
- Sem política
- Sem comercialização (exceto páginas profissionais)

---

### 7.9 NAMORO CRISTÃO

#### Funcionalidades
- Perfil específico para namoro
- Preferências: idade, congregação, cidade
- Match: interesse mútuo
- Chat exclusivo para matches
- Filtros: cargo, congregação, idade

#### Regras
- Apenas para membros batizados
- Sem fotos impróprias
- Sem conteúdo sexual
- Foco em relacionamento sério
- Casamento como objetivo

#### Privacidade
- Perfil separado do feed
- Visibilidade controlada
- Foto do feed não aparece no namoro
- Match apenas com interesse mútuo

---

### 7.10 MARKETPLACE

#### Categorias
| Categoria | Descrição |
|-----------|-----------|
| Livros | Livros cristãos |
| Roupas | Roupas modestas |
| Acessórios | Bíblias, cadernos |
| Música | CDs, instrumentos |
| Arte | Quadros, decoração |
| Serviços | Consultoria, aulas |
| Alimentos | Produtos naturais |

#### Funcionalidades
- Anúncio de produtos
- Carrinho de compras
- Pagamento (PIX, cartão)
- Entrega (correios, transportadora)
- Avaliação de vendedores
- Chat com vendedor
- Denúncia de anúncios

#### Regras
- Apenas produtos lícitos
- Sem produtos impróprios
- Sem política
- Sem conteúdo sexual
- Moderação de anúncios

---

### 7.11 PÁGINA PROFISSIONAL

#### O que é?
Uma página comercial para membros que desejam vender produtos ou serviços
dentro do app.

#### Funcionalidades
- Página personalizada
- Catálogo de produtos
- Portfólio de serviços
- Avaliações de clientes
- Estatísticas de visualização
- Sistema de ADS (anúncios)
- Chat com clientes
- Link para WhatsApp

#### Custos
| Plano | Preço | Benefícios |
|-------|-------|------------|
| Básico | R$ 29,90/mês | Página + 5 anúncios |
| Profissional | R$ 59,90/mês | Página + 20 anúncios + estatísticas |
| Premium | R$ 99,90/mês | Página + anúncios ilimitados + destaque |

#### Regras
- Apenas uma página por usuário
- Verificação de identidade
- Moderação de conteúdo
- Sem produtos impróprios
- Sem política partidária

---

### 7.12 SISTEMA DE ADS

#### O que é?
Sistema de anúncios para páginas profissionais promoverem seus produtos
e serviços.

#### Tipos de Anúncios
| Tipo | Descrição | Formato |
|------|-----------|---------|
| Feed | No feed de posts | Imagem/vídeo |
| Stories | Entre stories | Imagem/vídeo |
| Sidebar | Lateral do feed | Imagem |
| Banner | Topo da tela | Imagem |
| Reels | Entre reels | Vídeo |

#### Segmentação
- Idade
- Gênero
- Localização
- Congregação
- Interesses
- Cargo na igreja

#### Custos
| Formato | Preço mínimo |
|---------|--------------|
| CPM (1.000 views) | R$ 5,00 |
| CPC (por clique) | R$ 0,50 |
| CPA (por ação) | R$ 2,00 |

#### Regras
- Apenas para páginas profissionais
- Sem anúncios impróprios
- Sem política partidária
- Sem concorrentes do app
- Moderação de anúncios

---

### 7.13 PESQUISA DE USUÁRIOS

#### Filtros
| Filtro | Tipo |
|--------|------|
| Nome | Texto |
| Congregação | Seleção |
| Cidade | Texto |
| Estado | Seleção |
| Cargo | Seleção |
| Idade | Range |
| Interesses | Multi-seleção |

#### Resultados
- Lista de perfis
- Foto, nome, congregação
- Botão "Conectar"
- Botão "Mensagem"
- Botão "Ver perfil"

---

### 7.14 NOTIFICAÇÕES

#### Tipos de Notificações
| Tipo | Descrição |
|------|-----------|
| Like | Alguém curtiu seu post |
| Comentário | Alguém comentou seu post |
| Oração | Alguém orou por você |
| Mensagem | Nova mensagem |
| Grupo | Atividade em grupo |
| Evento | Lembrete de evento |
| Match | Novo match (namoro) |
| Sistema | Avisos do sistema |

#### Configurações
- Ativar/desativar por tipo
- Horário de silêncio
- Som de notificação
- Vibração
- Preview da mensagem

---

### 7.15 PEDIDOS DE ORAÇÃO

#### Funcionalidades
- Criar pedido de oração
- Categorias: saúde, família, trabalho, espiritual
- Visibilidade: público ou privado
- "Estou orando" (interação)
- Testemunhos (respostas)
- Arquivar respondidos

#### Categorias
| Categoria | Descrição |
|-----------|-----------|
| Saúde | Doenças, cirurgias |
| Família | Conflitos, reconciliação |
| Trabalho | Emprego, negócios |
| Espiritual | Salvação, crescimento |
| Estudos | Escolas, concursos |
| Outros | Diversos |

---

### 7.16 HINÁRIO DIGITAL

#### Funcionalidades
- Todos os 450 hinos
- Busca por número ou título
- Busca por tom musical
- Favoritos
- Compartilhar hino
- Áudio do hino
- Partitura (futuro)

#### Informações do Hino
- Número
- Título
- Tom
- Letra
- Áudio
- Categoria

---

### 7.17 BÍBLIA ONLINE

#### Funcionalidades
- Bíblia completa (ARA, NVI, ARC)
- Busca por livro, capítulo, versículo
- Versículo do dia
- Plano de leitura
- Marcação de versículos
- Anotações pessoais
- Compartilhar versículo

#### Versões
- Almeida Revista e Atualizada (ARA)
- Nova Versão Internacional (NVI)
- Almeida Revista e Corrigida (ARC)
- King James (futuro)

---

## 8. ESTRUTURA DE MENUS

### 8.1 Menu Principal (Bottom Tab)

| Ícone | Nome | Descrição |
|-------|------|-----------|
| 🏠 | Home | Feed de posts |
| 🔍 | Explorar | Pesquisa + Reels |
| ➕ | Criar | Novo post/story |
| 💬 | Mensagens | Chat |
| 👤 | Perfil | Meu perfil |

### 8.2 Menu Superior (Top Bar)

| Ícone | Nome | Descrição |
|-------|------|-----------|
| 🔔 | Notificações | Central de notificações |
| ⚙️ | Configurações | Ajustes do app |
| ⋮ | Mais | Menu adicional |

### 8.3 Menu Mais (Drawer)

| Opção | Descrição |
|-------|-----------|
| Grupos | Meus grupos |
| Eventos | Meus eventos |
| Hinário | Hinário digital |
| Bíblia | Bíblia online |
| Orações | Pedidos de oração |
| Marketplace | Loja |
| Namoro | Namoro cristão |
| Página Profissional | Minha página |
| Configurações | Ajustes |
| Sair | Logout |

---

## 9. CRONOGRAMA

### Fase 1: Fundação (Semanas 1-4)
- [ ] Configurar repositório Git
- [ ] Configurar ambiente de desenvolvimento
- [ ] Criar estrutura de pastas
- [ ] Configurar banco de dados
- [ ] Criar API base (Express)
- [ ] Criar app base (React Native)
- [ ] Implementar autenticação
- [ ] Criar telas de login/cadastro

### Fase 2: Core (Semanas 5-8)
- [ ] Implementar perfil de usuário
- [ ] Criar feed de posts
- [ ] Implementar interações (like, comentário)
- [ ] Criar sistema de stories
- [ ] Implementar mensageiro (chat)
- [ ] Criar grupos
- [ ] Implementar eventos

### Fase 3: Expansão (Semanas 9-12)
- [ ] Criar vídeos curtos (reels)
- [ ] Implementar namoro cristão
- [ ] Criar marketplace
- [ ] Implementar página profissional
- [ ] Criar sistema de ADS
- [ ] Implementar pesquisa de usuários
- [ ] Criar pedidos de oração

### Fase 4: Conteúdo (Semanas 13-16)
- [ ] Implementar hinário digital
- [ ] Criar Bíblia online
- [ ] Implementar notificações
- [ ] Criar sistema de moderação
- [ ] Implementar denúncias
- [ ] Criar painel admin

### Fase 5: Testes (Semanas 17-20)
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes de usabilidade
- [ ] Testes de segurança
- [ ] Testes de performance
- [ ] Correção de bugs

### Fase 6: Lançamento (Semanas 21-24)
- [ ] Preparação para lojas
- [ ] Criar contas nas lojas
- [ ] Submeter para aprovação
- [ ] Marketing inicial
- [ ] Lançamento beta
- [ ] Lançamento oficial

---

## 10. MODELO DE NEGÓCIO

### 10.1 Fontes de Receita

| Fonte | Descrição | Preço |
|-------|-----------|-------|
| Página Profissional | Assinatura mensal | R$ 29,90 - R$ 99,90 |
| Sistema de ADS | Anúncios | Variável |
| Marketplace | Comissão por venda | 5% |
| Doações | Contribuições voluntárias | Livre |

### 10.2 Custos Estimados

| Item | Custo Mensal |
|------|--------------|
| Servidores (AWS) | R$ 500,00 |
| Domínio | R$ 50,00 |
| Lojas (Apple/Google) | R$ 200,00 |
| Ferramentas | R$ 300,00 |
| Marketing | R$ 1.000,00 |
| **Total** | **R$ 2.050,00** |

---

## 11. EQUIPE

| Papel | Responsável | Status |
|-------|-------------|--------|
| Product Manager | Joabe | Ativo |
| Designer | A definir | Pendente |
| Frontend | A definir | Pendente |
| Backend | A definir | Pendente |
| QA | A definir | Pendente |

---

## 12. RISCOS E MITIGAÇÃO

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Problema jurídico com CCB | Médio | Alto | Nome genérico, sem vínculo |
| Baixa adesão | Médio | Alto | Marketing, parcerias |
| Concorrência | Baixo | Médio | Diferencial único |
| Custos altos | Médio | Médio | Doações, ofertas |
| Bugs e falhas | Alto | Médio | Testes rigorosos |

---

## 13. MÉTRICAS DE SUCESSO

| Métrica | Meta (6 meses) |
|---------|----------------|
| Usuários cadastrados | 10.000 |
| Usuários ativos diários | 2.000 |
| Posts diários | 500 |
| Grupos criados | 100 |
| Eventos criados | 50 |
| Páginas profissionais | 100 |
| Receita mensal | R$ 5.000 |

---

## 14. APÊNDICES

### 14.1 Termos de Uso
- A ser criado

### 14.2 Política de Privacidade
- A ser criado

### 14.3 Diretrizes da Comunidade
- A ser criado

### 14.4 FAQ
- A ser criado

---

## 15. ATUALIZAÇÕES DESTE DOCUMENTO

| Data | Versão | Alteração | Autor |
|------|--------|-----------|-------|
| 29/08/2026 | 1.0 | Criação do documento | Joabe |
| 29/08/2026 | 1.1 | Estrutura do projeto criada | Joabe |
| 29/08/2026 | 1.2 | Banco de dados criado | Joabe |
| 29/08/2026 | 1.3 | Rotas da API criadas | Joabe |
| 29/08/2026 | 1.4 | Telas do app criadas | Joabe |
| 29/08/2026 | 1.5 | Autenticação no app implementada | Joabe |
| 29/08/2026 | 1.6 | Feed de posts criado | Joabe |
| 29/08/2026 | 1.7 | Mensageiro criado | Joabe |
| 29/08/2026 | 1.8 | Stories criado | Joabe |
| 29/08/2026 | 1.9 | Eventos criado | Joabe |
| 29/08/2026 | 2.0 | Marketplace criado | Joabe |
| 29/08/2026 | 2.1 | Página profissional criada | Joabe |
| 29/08/2026 | 2.2 | Namoro criado | Joabe |
| 29/08/2026 | 2.3 | Sistema de ADS criado | Joabe |
| 29/08/2026 | 2.4 | Hinário digital criado | Joabe |
| 29/08/2026 | 2.5 | Bíblia online criada | Joabe |

---

## 16. ESTRUTURA DO PROJETO (CRIADA)

### 16.1 Arquivos Criados

| Arquivo | Descrição |
|---------|-----------|
| `backend/package.json` | Dependências do backend |
| `backend/tsconfig.json` | Configuração TypeScript |
| `backend/src/server.ts` | Servidor Express |
| `backend/src/config/knexfile.js` | Configuração do banco |
| `backend/migrations/20260829000001_create_all_tables.js` | Migração de todas as tabelas |
| `backend/src/models/User.js` | Modelo de usuários |
| `backend/src/models/Post.js` | Modelo de posts, comentários e likes |
| `backend/src/models/index.js` | Todos os modelos |
| `mobile/package.json` | Dependências do mobile |
| `docker-compose.yml` | Docker (PostgreSQL + Redis) |
| `README.md` | Documentação do projeto |
| `.gitignore` | Arquivos ignorados |

### 16.2 Tabelas do Banco de Dados (22 tabelas)

| # | Tabela | Descrição |
|---|--------|-----------|
| 1 | users | Usuários |
| 2 | posts | Posts |
| 3 | comments | Comentários |
| 4 | likes | Likes/orações |
| 5 | followers | Seguidores |
| 6 | groups | Grupos |
| 7 | group_members | Membros de grupos |
| 8 | group_posts | Posts em grupos |
| 9 | events | Eventos |
| 10 | event_attendees | Participantes de eventos |
| 11 | stories | Stories |
| 12 | story_views | Visualizações de stories |
| 13 | conversations | Conversas |
| 14 | conversation_participants | Participantes de conversas |
| 15 | messages | Mensagens |
| 16 | notifications | Notificações |
| 17 | prayer_requests | Pedidos de oração |
| 18 | prayer_interactions | Interações em orações |
| 19 | products | Produtos (marketplace) |
| 20 | professional_pages | Páginas profissionais |
| 21 | ads | Anúncios |
| 22 | matches | Matches (namoro) |
| 23 | reports | Denúncias |
| 24 | refresh_tokens | Tokens de refresh |

### 16.3 Próximos Passos

1. ✅ Estrutura do projeto (feito)
2. ✅ Banco de dados (feito)
3. ⏳ Criar rotas da API
4. ⏳ Criar telas do app
5. ⏳ Implementar autenticação
6. ⏳ Criar feed de posts

---

# ════════════════════════════════════════════════════════════════════════════════
# FIM DO DOCUMENTO
# ════════════════════════════════════════════════════════════════════════════════
