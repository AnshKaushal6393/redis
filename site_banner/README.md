# site_banner

Small Express + Redis service that lets you store and retrieve a banner message.

## Prerequisites
- Docker running `redis` from the repo root (recommended)
- Node.js

## Start Redis
From the repo root:

```bash
docker-compose up -d
```

Redis is available at:
- `localhost:6379` (mapped by `docker-compose.yml`)

## Install
```bash
cd site_banner
npm install
```

## Run
```bash
npm run dev
```

Server listens on:
- `http://localhost:3000`

## Environment variables
- `REDIS_URL` (optional)
  - default: `redis://localhost:6379`

## API
### Create/Update banner
`POST /banner`

Body:
```json
{ "message": "Hello" }
```

Example:
```bash
curl -X POST http://localhost:3000/banner \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Welcome to our site!\"}"
```

Response:
```json
{ "success": true }
```

### Get banner
`GET /banner`

Response:
```json
{ "message": "Welcome to our site!" }
```

### Delete banner
`DELETE /banner`

Response:
```json
{ "success": true }
```

### Check if banner exists
`GET /banner/exists`

Response:
```json
{ "exists": false }
```

