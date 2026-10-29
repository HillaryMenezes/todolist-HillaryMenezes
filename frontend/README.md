# Todolist Frontend (React + Vite)

```bash
npm install
cp .env.example .env   # ajuste VITE_API_URL se necessário
npm run dev            # http://localhost:5173
```

O backend precisa estar rodando (padrão: http://localhost:3333).

## Ajuste obrigatório no backend (CORS)

O `@fastify/cors` só libera GET, HEAD e POST por padrão, então PATCH e DELETE
são bloqueados pelo navegador. Em `server.js`:

```js
await app.register(cors, {
  origin: CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
});
```
