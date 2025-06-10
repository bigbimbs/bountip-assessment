<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Link Shortener Service

A scalable, efficient HTTP API for shortening URLs, redirecting, and tracking click analytics. Built with NestJS and Redis for high performance and reliability.

## Features

- Shorten any URL via HTTP POST
- Redirects short URLs to the original
- Tracks click info (IP, user-agent, timestamp)
- Scalable with Redis backend
- Rate limiting to prevent abuse
- Includes unit tests

## Requirements

- Node.js (v18+ recommended)
- Redis server (local or remote)

## Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root of `link-shortener/` with your Redis config:
   ```env
   REDIS_HOST=localhost
   REDIS_PORT=6379
   # REDIS_PASSWORD=yourpassword (if needed)
   # REDIS_DB=0 (optional)
   # REDIS_USERNAME= (optional)
   # REDIS_TLS=false (set to true if using TLS)
   # REDIS_URL=redis://user:pass@host:port/db (optional, overrides above)
   ```

## Running the Service

- **Development:**
  ```bash
  npm run start:dev
  ```
- **Production:**
  ```bash
  npm run start:prod
  ```

## API Usage

- **Shorten a URL:**
  ```http
  POST /shorten
  { "url": "http://example.com" }
  => { "short": "http://do.co/abc123" }
  ```
- **Redirect:**
  ```http
  GET /abc123
  # Redirects to original URL
  ```
- **Get Click Info:**
  ```http
  GET /info/abc123
  => [ { ip, ua, ts }, ... ]
  ```

## Testing

Run all tests:

```bash
npm run test
```

---

For questions or issues, open an issue in this repository.
