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



