# adhork

(Ad)s (Ho)mewo(rk)

## Features

The assignment was completed with an attempt to build a starting
ground for a potential new service. It also includes a sample consumer application, "News", which consumes the published ads and presents them back to the user. Solution includes following features:

- Dockerized workspace, with `docker-compose`
- Using Next.js + TypeScript + Serverless APIs
- Using Hasura as a Data Layer (on top of PostgreSQL)
- Code Co-location, potential future services could also be added within the current repo. It's just a tiny bit away from being a monorepo.

## Acknowledgments

Targeted for a quick completion, solution is naive and doesn't include some features which would be necessary to run it in production.

- Edge cases & Error handling
- Data validation at API layer
- Incremental updates for built Frontends

## Architecture

![Image of service architecture](/out/architecture/architecture.png)

Solution consists of multiple small components, each located in its own folder of this sample repo.

- **News** - component displaying content and ads to the end user
- **Ads** - distributes ads to potential consumers (such as **News**) via RESTful API
- **Hasura** - includes data layer and all relevant configuration (Hasura metadata + PostgreSQL migrations for DB configuration)

## User Flows

![Image of supported user flows](/out/sequence/sequence.png)

Solution implements 2 main happy paths:

- A third-party application consuming ads from Ads Service
- Ads service exposing the contents of Ads to the end user
