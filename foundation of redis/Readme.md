# Redis Foundation (Docker)

This repo contains a simple local setup for **Redis** (and **MongoDB**) using `docker-compose`.

## Prerequisites
- Docker Desktop (or Docker Engine) installed
- Docker Compose available (usually included with Docker Desktop)

## Start Redis + Mongo
From the repository root (`c:/Users/ace_ansh/OneDrive/Desktop/redis`), run:

```bash
docker-compose up -d
```

- Redis will be available on: `localhost:6379`
- MongoDB will be available on: `localhost:27017`

## Stop / Remove containers
```bash
docker-compose down
```

## Verify Redis
### Using `redis-cli`
If you have `redis-cli` installed locally:

```bash
redis-cli ping
```

Expected output:
- `PONG`

## Notes
- Redis is started with Append Only File enabled:
  - `--appendonly yes`
- Redis data is persisted in the Docker volume:
  - `redis-data:/data`

