const movieModel = require('../model/movieModel');
const cloudinary = require('../config/cloudinaryConfig');
// const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

class MovieController {
	createMovie = async (req, res) => {
		console.log('Inside movie controller');
		const {video, title, description } = req.body;
		try {
			console.log('about to call upload');
			console.log(this);
			const result = await this.upload(req);
			const { url, duration, format, public_id, width, height } = result;

			//checking database for duplicate

			const movie = await movieModel.findOne({ publicId });
			if (movie) {
				res.status(400).json({
					status: 400,
					message: 'Movie already saved',
				});
				return;
			}

			const savedVideo = await movieModel.create({
				videoUrl: url,
				title,
				description,
				duration,
				format,
				publicId: public_id,
			});
			console.log(savedVideo);
			res
				.status(200)
				.json({ message: 'Video saved', data: savedVideo, width, height });
			return;
		} catch (error) {
			console.log('error => ', error.message);
			res.status(400).json(error.message);
		}
	};

	streamUpload(req) {
		return new Promise((resolve, reject) => {
			console.log('cloudinary streaming...');

			let stream = cloudinary.uploader.upload_stream(
				{'resource_type': 'video'},
				(error, result) => {
					if (result) {
						resolve(result);
					} else {
						reject(error);
					}
				}
			);
			console.log('the request file =>', req.file);
			console.log('the request file buffer =>', req.file.buffer);
			streamifier.createReadStream(req.file.buffer).pipe(stream);
		});
	}

	async upload(req) {
		console.log('about to call streamupload');

		return await this.streamUpload(req);
	}

	async updateMovie(req, res) {
		try {
			let movieId = req.params.id;
			const movie = await movieModel.findByIdAndUpdate(movieId, req.body);
			if (movie) {
				res.status(200).json('Update successful...');
			} else {
				throw new Error("This movie doesn't exists");
			}
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	async getMovie(req, res) {
		try {
			const movie = movieModel.find();
			movie
				.then((result) => res.status(200).json(result))
				.catch((error) => console.error(error));
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	async searchMovieById(req, res) {
		try {
			const id = req.params.id;
			const movie = await movieModel.findById(id);
			if (movie) {
				res.status(200).json(movie);
			} else {
				throw new Error("This movie doesn't exists");
			}
		} catch (error) {
			res.status(400).json(error.message);
		}
	}

	async deleteMovie(req, res) {
		// get the id from request
		try {
			let movieId = req.params.id;
			const movie = await movieModel.findByIdAndDelete(movieId, req.body);
			if (movie) {
				res.status(200).json('Deleted');
			} else {
				throw new Error("This movie doesn't exists");
			}
		} catch (error) {
			res.status(400).json(error.message);
		}
	}
}

module.exports = MovieController;
