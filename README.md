# Redis Playground

This repo contains a small local Redis setup (via Docker Compose) and example Node.js services that use Redis.

## Contents
- `docker-compose.yml` - local Redis + MongoDB services
- `foundation of redis/Readme.md` - documentation for the Docker setup
- `setup_local_redis/` - Node.js example connecting to Redis + Mongo
- `site_banner/` - Node.js + Redis example with REST endpoints
- `user_profile_cache_json_vs_hash/` - comparison of caching user profiles as JSON strings vs Redis hashes


## Quick start (Redis + Mongo)
From the repo root:

```bash
docker-compose up -d
```

Redis:
- `localhost:6379`

MongoDB:
- `localhost:27017`

Stop:

```bash
docker-compose down
```

## Example projects

### setup_local_redis
See: `setup_local_redis/readme.md`

### site_banner
See: `site_banner/README.md`

### email_redis
Small Express + Redis example that pushes email jobs onto a Redis list and lets you process one job at a time.

**Run**
```bash
cd email_redis
npm install
npm run dev
```

Server listens on:
- `http://localhost:3000`

**API**
- `POST /emails`
  - Body: `{ "to": "...", "subject": "...", "body": "..." }`
  - Pushes a job to `queue:emails` in Redis
- `GET /emails/process-one`
  - Pops one job from `queue:emails` via `RPOP`
  - If empty: returns `{ "message": "No jobs in the queue" }`

### user_profile_cache_json_vs_hash
See: `user_profile_cache_json_vs_hash/README.md`

### bull_mq
BullMQ example that demonstrates a producer (Express API) + consumer (Worker) using Redis.

**Run (from repo root)**

1) Start Redis

```bash
docker-compose up -d
```

2) API (producer)

```bash
cd bull_mq
npm install
npm run dev
```

The API listens on:
- `http://localhost:3000`

3) Worker (consumer)

In a separate terminal (repo root), run:

```bash
cd bull_mq
node src/worker.js
```

**API**
- `POST /welcome-email`
  - Body:
    - `to` (string) - required
    - `name` (string) - optional (defaults to `"Learner"`)
  - Example:

```bash
curl -X POST http://localhost:3000/welcome-email \
  -H "Content-Type: application/json" \
  -d '{"to":"alice@example.com","name":"Alice"}'
```

- Response:
  - `jobId` of the created BullMQ job

**Notes**
- `bull_mq/src/queue.js` connects to Redis at `localhost:6379` (no environment variable required).
- Jobs are placed on the BullMQ queue named: `emails`




