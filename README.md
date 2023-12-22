# Elysia + Drizzle + Lucia + PlanetScale

## Development

First, move the `.env.example` file to `.env` like this:

```bash
mv .env.example .env
```

Fill out each variable

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Routes

- / (GET)
- /auth
-     /me (GET)
-     /login (POST)
-     /register (POST)
-     /logout (POST)
- /ping
-     / (GET)
