# DataStax Vector-powered Raffle App

## Install

- Clone this repo.
- `npm install`

## Configure

- Create a [free Astra account](https://astra.datastax.com/register)
- Create a Vector Database
- Create a collection called "raffle"

`cp .env-example .env`

Fill-in values for your Astra DB and OpenAI keys

## Admin

Run `node scripts/admin.mjs start` to create a new raffle

## Raffle App

Run `npm run dev` to start your local server. Deploy the app to run it in production.

## Web App

The default behavior of the web app is to collect a user's `name` and `email_address`. 

If you add the query parameter `?ql=true`, it will also capture `company` and `job_title`.
