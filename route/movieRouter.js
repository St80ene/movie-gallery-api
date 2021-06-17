const express = require('express');
const router = express.Router();
const movieController = require('../controller/MovieController')

const movie = new movieController();

router.get('/Movie-gallery/movies', movie.getMovie);

router.get('/Movie-gallery/movies/:id', movie.searchMovieById);

router.post('/Movie-gallery/movies', movie.createMovie);

router.put('/Movie-gallery/movies/:id', movie.updateMovie);

router.delete('/Movie-gallery/movies/:id', movie.deleteMovie);

module.exports = router;
