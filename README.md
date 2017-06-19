# Document Management System (Odahi)
[![Coverage Status](https://coveralls.io/repos/github/andela-fmustapha/document-management/badge.svg?branch=develop)](https://coveralls.io/github/andela-fmustapha/document-management?branch=develop) 
[![Build Status](https://api.travis-ci.org/andela-fmustapha/document-management.svg?branch=develop)](https://travis-ci.org/andela-fmustapha/document-management)
<a href="https://codeclimate.com/github/andela-fmustapha/document-management"><img src="https://codeclimate.com/github/andela-fmustapha/document-management/badges/gpa.svg"/></a>

Document Management System is a react redux application based on RESTful API for users to create and manage documents giving different privileges based on user roles and managing authentication using JWT.

## Development
This application was developed using the following frameworks.

*   [NodeJs](https://nodejs.org)
*   [React Redux](http://redux.js.org/docs/basics/UsageWithReact.html)
*   [express](https://expressjs.com/)
*   [Sequelize](https://sequelizejs.org) as [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)

## Application Features
###### User Authentication
Users are authenticated and validated us JWT web token. Generating tokens on signup and login ensures documents and API endpoints are protected.

###### Document Management
*   Create an account
*   Login with your credentials
*   Create new document with specifying document title, content and document access
*   Edit Documents
*   Delete documents
*   View public documents created by other users.
*   View documents created by his access group with access level set as `role`.
*   Search a users public documents.
*   View `public` and `role` access level documents of other regular users.
*   Logout

-   In addition to the general user functions, an admin user can:
    -   View all users.
    -   View all created documents except documents with access set to private.
    -   Delete any user.
    -   Update any user's record.
    -   Create a new role.
    -   View all created roles.
    -   Search for any user.

## Installation
-   Ensure that you have NodeJs and Postgres installed on your machine
-   Clone the repository `$ git clone https://github.com/andela-fmustapha/document-management.git`
-   Change into the directory `$ cd document-management`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory as described in `.env.sample` file

## Usage
-   Run DB Migrate command with  `sequelize  db:migrate`
-   Seed you DB by running this command `npm run db:seed`, this seeds Admin Role and Regular Role.
-   Run `npm run start:dev` to start the application on development environment

## Testing
-   Run DB migrate command with `npm run db:migrate:test`.
-   Run Test `npm test`
-   You can undo your migrations by running this command `npm run db:migrate:test:undo`.

` I strongly suggest using separate DB for testing and development `

## API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.
#### API Features

The following features make up the Document Management System API:

###### Authentication
-   It uses JSON Web Token (JWT) for authentication.  

-   It generates a token on successful login or account creation and returns it to the consumer.  

-   It verifies the token to ensures a user is authenticated to access protected endpoints.

###### Users

-   It allows users to be created.  

-   It allows users to login and obtain a token  

-   It allows authenticated users to retrieve and update their information.  

-   It allows the admin to manage users.

###### Roles

-   It ensures roles can be created, retrieved, updated and deleted by an admin user.
-   A non-admin user cannot create, retrieve, modify, or delete roles.  
-   it allows for assignment of roles to users

###### Documents

-   It allows new documents to be created by authenticated users.  

-   It ensures all documents are accessible based on the permission specified.  

-   It allows admin users to create, retrieve, modify, and delete documents.


-   It ensures users can delete, edit and update documents that they own.  

-   It allows users to retrieve all documents they own as well as public documents.

###### Search

-   It allows users to search public documents for a specified search term.

-   It allows admin to retrieve all documents that matches search term.

-   It allows admin to search users based on a specified search term

#### Available API Endpoints and their Functionality

EndPoint                    |   Functionality
----------------------------|------------------------
POST /users/login           |   Logs a user in.
POST /users/logout          |   Logs a user out.
POST /users/                |   Creates a new user.
GET /users/                 |   Find matching instances of user.
GET /users/<id>             |   Find user.
PUT /users/<id>             |   Update user attributes.
DELETE /users/<id>          |   Delete user.
GET /users/?limit={interger}&offset={interger}| Pagination for users
POST /documents/            |   Creates a new document instance.
GET /documents/             |   Find matching instances of document.
GET /documents/<id>         |   Find document.
GET /documents/?limit={interger}&offset={interger}| Pagination for documents
PUT /documents/<id>         |   Update document attributes.
DELETE /documents/<id>      |   Delete document.
GET /users/<id>/documents   |   Find all documents belonging to the user.
GET /search/users/?q={username}   |   Gets all users with username contain the search term
GET /search/documents/?q={doctitle}| Get all documents with title containing the search query
GET /users/:id/alldocuments|   Get all document owned or accessible by `userId`
GET /users/:identifier|Find user with email or username containing the identifier parameter

#### View Complete API Documentation here
-   [API Documentation](https://andela-fmustapha.github.io/DMS-Docs/)


#### Contribution
### Prerequisites includes
-   [Postgresql](https://www.postgresql.org/) and
-   [Node.js](http://nodejs.org/) >= v6.8.0.

### Procedure
1.  Clone this repository from a terminal `git clone https://github.com/andela-fmustapha/document-management.git`.
2.  Move into the project directory `cd document-management`
3.  Install project dependencies `npm install`
4.  Create Postgresql database and run migrations `npm run db:migrations`.
5.  Start the express server `npm run start:dev`.
6.  Run test `npm test`.
7.  Branch out of master `git checkout -b [new-branch-name]`
8.  Make changes and commit your changes
9.  Git push and make a pull request to my repo

#### Limitations
Our APi may not be able to handle larger requests as the user base grows beyond a million.
