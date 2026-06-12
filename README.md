# Redis Playground

This repo contains a small local Redis setup (via Docker Compose) and example Node.js services that use Redis.

## Contents
- `docker-compose.yml` - local Redis + MongoDB services
- `foundation of redis/Readme.md` - documentation for the Docker setup
- `setup_local_redis/` - Node.js example connecting to Redis + Mongo
- `site_banner/` - Node.js + Redis example with REST endpoints

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

