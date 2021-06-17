# movie-gallery-api

API to serve My Video Gallery Website


## API Reference

#### Homepage

```http
  GET /
```

#### Get all movies

```http
  GET /movies
```

#### Get movies

```http
  GET /movies/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create movies

```http
  POST /movies/upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of movie |
| `description`      | `string` | **Required**. Description of movie |

#### Update movies

```http
  PUT /movies/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movies |
| `key`      | `string` | **Required**. Key of movies |

#### Delete movies

```http
  DELETE /movies/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of movies |
| `key`      | `string` | **Required**. Key of movies |


  

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`
`PORT`
`DB_NAME`
`DB_PASSWORD`
`DB_USERNAME`
`CLOUD_NAME`
`CLOUD_API_KEY`
`CLOUD_API_SECRET`
`CLOUDINARY_URL`

  
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
  git@github.com:St80ene/movie-gallery-api.git
```

Go to the project directory

```bash
  cd movie-gallery-api
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

  
  
