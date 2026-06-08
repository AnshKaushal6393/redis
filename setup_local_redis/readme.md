# setup_local_redis

A small Node.js project intended to connect to **Redis** (via `ioredis`) and **MongoDB** (via `mongoose`) while using the local services from the repo’s `docker-compose.yml`.

## Prerequisites
- Node.js installed
- Docker running the services (recommended)

## Start dependencies/services (Redis + Mongo)
From the repo root:

```bash
docker-compose up -d
```

## Install project dependencies
```bash
cd setup_local_redis
npm install
```

## Run
The current `src/index.js` file is not complete yet (it only includes imports and initial setup in the snippet currently present in the repo).

If you want to run it directly for now:

```bash
node src/index.js
```

> Note: The project uses ES module-style `import ... from ...`.
> If Node complains about module type, ensure `"type": "commonjs"` in `package.json` matches your runtime expectations.

## Redis connection
The code currently instantiates Redis like this:

- `const redis = new Redis();`

By default, `ioredis` will attempt to connect to `localhost:6379`.

If you run Redis via docker-compose on your local machine, the default mapping in `docker-compose.yml` makes that work:
- Redis: `6379:6379` => `localhost:6379`

## Next steps (recommended)
- Finish implementing server/routes in `src/index.js`
- Add a `start` script in `package.json` (e.g. `node --watch src/index.js`)
- Add configuration via environment variables (Redis/Mongo URLs)

