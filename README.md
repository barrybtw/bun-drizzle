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

- `/`
  GET Simple hello elysia message

- `/ping`
  GET Simple ping message

- `/auth/me`
  GET Get the current session, 401 if none

- `/auth/register`
  POST Create a user, takes in a form with username & password, sets a cookie and sends the user to `/`

- `/auth/login`
  POST Logs in a user, takes in a form with username & password, sets a cookie and sends the user to `/`

- `/auth/logout`
  POST Logs out a user, clears cookie, 401 if no session found
