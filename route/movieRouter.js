const express = require('express');
const router = express.Router();
const movieController = require('../controller/MovieController');
const multer = require('multer');
// const { videoUpload } = require('../config/multerConfig');

const fileUpload = multer();

const movie = new movieController();

router.get('/Movie-gallery/movies', movie.getMovie);

router.get('/Movie-gallery/movies/:id', movie.searchMovieById);

router.post('/Movie-gallery/movies',fileUpload.single('video'), movie.createMovie);

router.put('/Movie-gallery/movies/:id', movie.updateMovie);

router.delete('/Movie-gallery/movies/:id', movie.deleteMovie);

module.exports = router;
