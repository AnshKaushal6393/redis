# user_profile_cache_json_vs_hash

Node.js + Express example showing two common Redis data modeling approaches for caching user profiles:

1. **JSON string**: store the whole profile under a single key (via `SET`).
2. **Hash**: store the profile fields under a Redis hash (via `HSET`).

This project is useful for comparing ergonomics and performance characteristics between:
- `GET/SET` of a JSON blob
- `HGETALL/HSET` of a hash

---

## Prerequisites

- Node.js installed
- Redis running (this repo includes a local Redis via `docker-compose.yml` at the repo root)

---

## Start Redis (from repo root)

```bash
docker-compose up -d
```

Redis will be available at:
- `localhost:6379`

---

## Install

```bash
cd user_profile_cache_json_vs_hash
npm install
```

---

## Run

```bash
npm run dev
```

Server listens on:
- `http://localhost:3000`

---

## Configuration

- `REDIS_URL` (optional)
  - default: `redis://localhost:6379`

---

## API

### 1) Store as JSON string

#### Save JSON
`POST /user/:id/json`

Body:
```json
{
  "name": "Alice",
  "age": 30,
  "role": "admin"
}
```

#### Get JSON
`GET /user/:id/json`

Response:
```json
{
  "user": {
    "name": "Alice",
    "age": 30,
    "role": "admin"
  }
}
```

---

### 2) Store as Redis Hash

#### Save Hash
`POST /user/:id/hash`

Body is treated as the hash fields (flat key/value pairs):
```json
{
  "name": "Alice",
  "age": 30,
  "role": "admin"
}
```

#### Get Hash
`GET /user/:id/hash`

Response:
```json
{
  "user": {
    "age": "30",
    "name": "Alice",
    "role": "admin"
  }
}
```

> Note: Redis returns hash values as strings.

---

## Implementation notes

- JSON mode stores everything under a single key:
  - `user:{id}:json`
- Hash mode stores everything under a hash:
  - `user:{id}:hash`

---

## Next improvements (optional)

- Add TTL/expiry for cached profiles (`EXPIRE`).
- Add input validation (e.g., required fields, data types).
- Add error handling for invalid JSON / Redis connectivity.

