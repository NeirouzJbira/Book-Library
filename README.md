# Book-Library
A book library REST API, created using Express and Sequelize to perform CRUD operations on a MySQL database. Some features are still in production.
<br>
## General info

This book library REST API project consists of a MySQL relational database, with tables containing information about library users (readers), books and lenders, and a REST API for interacting with the database to perform CRUD (create, read, update, delete) operations. The API itself has been built using Express and it uses the Sequelize Object Relational Mapper (ORM) to interact with the MySQL database.

Using the API, the user can send HTTP requests to perform CRUD (create, read, update, delete) actions on the book library database.

The API was created using Test Driven Development methodology, using Mocha, Chai and Supertest for automated testing. Postman was also used for testing during development, in conjunction with MySQL Workbench.

In addition, Docker was used as a system-agnostic environment in which to create and run the MySQL database locally. Dotenv was used to handle the environment variables and Nodemon was used during development as a useful tool to refresh the app after making changes to the Express app.

## Concepts

This API was created as part of the Manchester Codes Software Engineering course. The project covered the following concepts:

- Databases & database design
- Data schema
- SQL
- MySQL
- Sequelize
- Database querying and CRUD operations
- Test Driven Development(TDD)

## Technologies

- Express
- Sequelize
- MySQL & MySQL Workbench
- Mocha, Chai and SuperTest
- Docker
- Node.js and Node Package Manager
- Git & GitHub
- Dotenv
- Nodemon
- Postman

## Languages

- JavaScript
- SQL