# Server

It is a Node.js backend API built with TypeScript (https://typescriptlang.org) and Express.js (https://expressjs.com) framework. It uses Knex (https://knexjs.org) to connect to database and build SQL queries. Project has already the following:
1) Configured database connection in `./src/db/knex.ts`. Default is PostgreSQL but if you prefer other SQL database, then it is allowed to change it but you would need to change the database configuration file accordingly.
2) Database migration files to create 2 tables in `./src/db/migrations` folder
3) Database seed file to create data to tables in `./src/db/seeds` folder
4) Database query getCustomers in `./src/db/queries` to get all the customers in `customer` table
5) Router file in `./src/router.ts` with one GET endpoint `/customers` that returns the result of getCustomers query

## Requirements to run it in your computer
* Node.js and NPM (https://nodejs.org/en/download)
* Docker (https://www.docker.com) - needed to host a local database. If you will set up local database without docker, then you don't need to install docker.

## How to get it running?
1) Set up a local PostgreSQL database (or any other SQL database you prefer). If you use docker, you can easily do it by running this docker command in your terminal `docker run --name leaderboard-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`
2) Go inside the /server folder
3) `npm install` to install all the required node modules
4) `npm run build` to compile TypeScript which would genereate a /dist folder
5) `npm run dev` to run it in dev mode or `npm run build && npm run start` to run it in normal mode
6) If it started successfully, you can try fetching the existing customers endpoint by doing GET request to `http://localhost:3000/customers`
