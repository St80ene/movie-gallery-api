const express = require('express');
const multer = require('multer');
const router = express.Router();
const MovieController = require('../controller/MovieController');
// const movieValidation = require('../middlewares/movieMiddleware')

const fileUpload = multer();
const movie = new MovieController();

router.get('/movies', movie.getMovies);

router.get('/movies/:id', movie.getMovieById);

router.post('/movies/upload', fileUpload.single('video'), movie.upload);

router.put('/movies/:id', movie.updateMovie);

router.delete('/movies/:public_id', movie.deleteMovie);

module.exports = router;
