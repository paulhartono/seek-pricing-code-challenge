# pricing-api

Pricing API is a REST API micro service that provides information on product pricing as well as customer special pricing model

# Concept behind the implementation

Pricing API is a micro service which focus on a specific domain, that is `pricing`. It only knows its pricing table, and how to calculate the total amount given a list of items.
This microservice assumes that checkout or ordering / cart system is provided by another micro service.

The implementation of this pricing-api aims to be simple, yet flexible enough to be extended for a `customer special pricing`.
It follows the SOLID Principle primarily the OPEN/CLOSED principle to implement the `special pricing rules`

**NOTE: The `Retail Price` amount is stored and returned in cents to avoid floating point issues. Any client should convert it back to dollar when necessary**

# Environment Variables

`SYSTEM_NAME` name of this system (you can name it anything)

`HTTP_PORT` port number this api will be exposed

`JWT_SECRET` This API is using JWT token to make sure caller are authenticated. This is the JWT secret key

# How to

## Pre-requisite

- Clone this repo
- Install dependencies: Type `npm install`

## Run the app using docker

1. Make sure you have Docker installed. If not you can get it from https://docs.docker.com/get-docker/
2. Type `docker-compose up` from your command line
3. you can now check if the api is running by going to your browser, and type `http://localhost:3000/healthcheck`

## Run the app manually

1. Type `DOTENV=.env.local npm start`
2. you can now check if the api is running by going to your browser, and type `http://localhost:3000/healthcheck` (Unless you modified your `HTTP_PORT` env)

## Run test

1. Type `DOTENV=.env.local npm test`

# Sample JWT Token

This token can be used when you are doing testing with postman or similar app. Simply put it into your Authorization `Bearer` Token.

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwcmljaW5nLWFwaSIsImlhdCI6MTYyMzUwMjc0MX0.OpTe6dfmtDKCHFoL3v_HyoW5gpzfXnQTrCSbjZUJepE`

# Swagger API Docs

As of current we have 3 endpoints (for detailed signature please see the swagger file).

If you don't have a swagger viewer tool handy, you can simply go to https://editor.swagger.io/ and copy paste the content of `src/swagger.yaml` file

## Routes Summary

`GET /healthcheck` --> to check if the api is running fine

`GET /pricing` --> to get list of default product pricing

`POST /pricing/calculate` --> calculate the pricing given list of item codes as string array

Sample cURL:

**Default pricing**

```
curl --location --request POST 'http://localhost:3000/pricing/calculate' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwcmljaW5nLWFwaSIsImlhdCI6MTYyMzUwMjc0MX0.OpTe6dfmtDKCHFoL3v_HyoW5gpzfXnQTrCSbjZUJepE' \
--header 'Content-Type: application/json' \
--data-raw '{ "items": ["classic","standout","classic" ]}'
```

**Axil**

```
curl --location --request POST 'http://localhost:3000/pricing/calculate?customer=axil' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJwcmljaW5nLWFwaSIsImlhdCI6MTYyMzUwMjc0MX0.OpTe6dfmtDKCHFoL3v_HyoW5gpzfXnQTrCSbjZUJepE' \
--header 'Content-Type: application/json' \
--data-raw '{ "items": ["classic","standout","classic" ]}'
```

# TODO List

- Deploy this API in cloud either AWS or GCP and put links here
- Swagger codegen to generate client from the swagger docs
- More Test scripts to cover all routes
- Build a sample `BFF` and `Frontend` and points to this api straight away for better demonstration of this project
