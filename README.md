# agi-be

## Introduction

This repository contains the back-end for AGI America.

## Test API (SwaggerHub)

Check out the [Swagger Docs](https://app.swaggerhub.com/apis-docs/agi1001/agi100/1.0.0) for an interactive API client.
To use the interactive client, switch the url display on that page to (https://agi-be.herokuapp.com/)

## Table of Contents

- [Test User Accounts](#test-user-accounts)
- [Summary Table of API Endpoints](#summary-table-of-api-endpoints)
- [Auth Routes](#auth-routes)
  - [Register](#register)
  - [Login](#login)
- [Users Routes](#users-routes)
  - [Get Users](#get-users)
  - [Get User](#get-user)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Document Routes](#documents-routes)
  - [Get Documents](#get-documents)

# DATA SCHEMA (DATA STRUCTURES)

`Users`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "username": "admin",                      // String, required
  "password": "password",                   // String, required
  "firstName": "admin",                     // String, required
  "lastName": "istrator",                   // String, required
  "email": "email@gmail.com"                // String, required
	"phoneNumber":"291-212-2342",           // String
	"address":{
		"street":"123 main st",             // String
		"city":"NYC",                       // String
		"state":"NY",                       // String
		"zipCode":"23453",                  // Number
		"Country":"USA"                     // String
	},
	"lincenseInfo":{
		"board":"Van Henry",                // String
		"licenseNumber":"2323244",          // Number
		"licenceIssued":"Three",            // String
		"agentType":"Single Agent"          // String
	},
	"legal":{
		"complaintsFiled": "no",            // Boolean
		"licenseSuspended": "no"            // Boolean
	},
	"joinTeam": "yes"
}
```

# TEST USER ACCOUNTS

`Users`

```
  email: test1@test.com
  password: test1test1

  email: test2@test.com
  password: test2test2

```

# SUMMARY TABLE OF API ENDPOINTS

| Table     | Method | Endpoint                  | Description                                                                                                                                                                                    |
| --------- | ------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth      | POST   | /api/auth/register        | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` and a JSON Web Token in the `body` of the response.   |
| auth      | POST   | /api/auth/login           | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response. |
| users     | GET    | /api/restricted/users     | Retrieves an array of `user` objects and returns a message with the array in the `body` of the response.                                                                                       |
| users     | GET    | /api/restricted/users/:id | Retrieves a single `user` object and returns a message with the object inside the `body` of the response.                                                                                      |
| users     | PUT    | /api/restricted/users/:id | Updates a `user` in the database using the information sent inside the `body` of the request and returns a message with the updated `user` profile.                                            |
| users     | DELETE | /api/restricted/users/:id | Removes a `user` from the database using the id sent in the URL parameters of the response.                                                                                                    |
| documents | GET    | /api/docs/agent-docs      | Pings the server, which in turn sends an email with a document attached.                                                                                                                       |
