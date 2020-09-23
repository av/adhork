# adhork

(Ad)s (Ho)mewo(rk)

## Features

Taking into account limited time, the assignment was completed with a "Spike" or "MVP" style. Apart from that, I tried to implement a semi-realistic DX required for a larger codebase. It also includes a sample consumer application, "News", which consumes the published ads and presents them back to the user. Solution includes following features:

- Dockerized workspace, with `docker-compose`
- Using Next.js + TypeScript + Serverless APIs
- Using Hasura as a Data Layer (on top of PostgreSQL)
- Code Co-location, potential future services could also be added within the current repo. It's just a tiny bit away from being a monorepo.

## Acknowledgments

Targeted for a quick completion, solution is naive and doesn't include some features which would be necessary to run it in production.

- Edge cases & Error handling
- Data validation at API layer
- Incremental updates for built Frontends

On the other hand, despite the limited time, I've managed to add sample (very basic) tests:

- [Ads lib module test](https://github.com/av/adhork/blob/master/ads/lib/ads.test.ts)
- [Ads click E2E test](https://github.com/av/adhork/blob/master/e2e/tests/01-clicking-an-ad.ts)

The latter is pretty interesting, it visits an "Ad Administration" page, remembers first ad clicks, then opens the "News" app, visits the ad URL and then verifies that clicks stat was incremented back on "Ad Administration".

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

## Running locally

In order to run this assignment on your own machine:

- Ensure that `docker` and `docker-compose` are installed
- Ensure that `node` and `yarn` are installed
- `git clone git@github.com:av/adhork.git` in the desired folder
- Run `yarn` in `ads`, `e2e`, `news` components
- Launch services with `yarn dev` from project root
- Apply hasura migrations and metadata with `yarn hasura:apply` from project root. This will apply stored SQL migrations and tracked tables/functions to a running Hasura instance.
- Add sample ads data with Hasura Console. To launch console run `yarn hasura:console` while containers are up and running, you'll also be able to explore the data model there.

After these steps performed, visit `http://localhost:3000` for "Ads Admin" app and `http://localhost:3001` for the "News App". New ads could be added via Hasura,
