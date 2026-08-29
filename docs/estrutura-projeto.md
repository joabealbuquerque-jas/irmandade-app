# ════════════════════════════════════════════════════════════════════════════════
# ESTRUTURA DO PROJETO "IRMANDADE"
# Criada em: 29/08/2026
# ════════════════════════════════════════════════════════════════════════════════

## ESTRUTURA DE PASTAS

```
irmandade/
├── mobile/                     # App React Native
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── screens/            # Telas do app
│   │   ├── navigation/         # Navegação
│   │   ├── services/           # Serviços de API
│   │   ├── store/              # Redux store
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Utilitários
│   │   ├── types/              # Tipos TypeScript
│   │   ├── assets/             # Imagens, fontes
│   │   └── constants/          # Constantes
│   ├── android/
│   ├── ios/
│   ├── package.json
│   ├── tsconfig.json
│   └── App.tsx
│
├── backend/                    # API Node.js
│   ├── src/
│   │   ├── controllers/        # Controladores
│   │   ├── models/             # Modelos do banco
│   │   ├── routes/             # Rotas da API
│   │   ├── middlewares/        # Middlewares
│   │   ├── services/           # Lógica de negócio
│   │   ├── utils/              # Utilitários
│   │   ├── types/              # Tipos TypeScript
│   │   ├── config/             # Configurações
│   │   └── database/           # Conexão com banco
│   ├── migrations/             # Migrações do banco
│   ├── seeds/                  # Dados iniciais
│   ├── package.json
│   ├── tsconfig.json
│   └── server.ts
│
├── docs/                       # Documentação
│   └── manual.md               # Manual do projeto
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

## PRÓXIMOS PASSOS

1. Criar package.json do backend
2. Criar package.json do mobile
3. Criar tsconfig.json
4. Criar server.ts (backend)
5. Criar App.tsx (mobile)
6. Criar estrutura de banco de dados
