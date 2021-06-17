const express = require('express');
const router = express.Router();
const movieController = require('../controller/MovieController');
const multer = require('multer');
// const { videoUpload } = require('../config/multerConfig');

const fileUpload = multer();

const movie = new movieController();

router.get('/movies', movie.getMovie);

router.get('/movies/:id', movie.searchMovieById);

router.post('/movies/upload',fileUpload.single('video'), movie.createMovie);

router.put('/movies/:id', movie.updateMovie);

router.delete('/movies/:id', movie.deleteMovie);

module.exports = router;
