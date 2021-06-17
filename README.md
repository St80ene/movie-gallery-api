# movie-gallery-api
API to serve My Video Gallery Website

A CRUD APP to handle video requests


## API Reference

#### Homepage

```http
  GET /
```

#### Get all movies

```http
  GET /movies
```

#### Get user

```http
  GET /movies/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create user

```http
  POST /movies/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of user to create |
| `email`      | `string` | **Required**. Email of user to create |
| `country`      | `string` | **Required**. Country of user to create |

#### Update user

```http
  PUT /users/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to update |
| `key`      | `string` | **Required**. Key of user to update |

#### Delete user

```http
  DELETE /users/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete |
| `key`      | `string` | **Required**. Key of user to delete |


  

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URI`

`PORT`

  
## Authors

- [@St80ene](https://github.com/St80ene)

  

  
## Deployment

To deploy this project run

```bash
  npm start
```

## Heroku Deployment Links
Base URL: https://movie-gallery-api.herokuapp.com/

  
## Run Locally

Clone the project

```bash
  git clone git@github.com:St80ene/zuri-task5-crud-app.git
```

Go to the project directory

```bash
  cd zuri-task5-crud-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

  
## Tech Stack

**Server:** Node, Express

  
  
