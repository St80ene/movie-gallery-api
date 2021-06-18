const movieModel = require('../model/movieModel');
const cloudinary = require('../lib/cloudinaryConfig');
const streamifier = require('streamifier');

class MovieController {
	createMovie = async (req, res) => {
		const { title, description } = req.body;
		try {
			const result = await this.upload(req);
			const { url, duration, format, public_id, width, height } = result;

			//checking database for duplicate

			const movie = await movieModel.findOne({ publicId: public_id });
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

			res.status(200).json({
				status: 201,
				message: 'uploaded successfully',
				data: savedVideo,
				meta: { width, height },
			});
			return;
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	};

	streamUpload(req) {
		return new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream(
				{ resource_type: 'video' },
				(error, result) => {
					if (result) {
						resolve(result);
					} else {
						reject(error);
					}
				}
			);
			streamifier.createReadStream(req.file.buffer).pipe(stream);
		});
	}

	async upload(req) {
		return await this.streamUpload(req);
	}

	async updateMovie(req, res) {
		try {
			let movieId = req.params.id;
			const { title, description } = req.body;
			const movie = await movieModel.findByIdAndUpdate(
				movieId,
				{
					title,
					description,
				},
				{ new: true }
			);
			if (movie) {
				res
					.status(201)
					.json({ status: 201, message: 'updated successfully', data: movie });
			} else {
				throw new Error('Not Found');
			}
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}

	async getMovies(_req, res) {
		try {
			const movie = movieModel.find();
			movie
				.then((result) => res.status(200).json(result))
				.catch((error) => res.json({ status: 400, message: error.message }));
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}

	async getMovieById(req, res) {
		try {
			const id = req.params.id;
			const movie = await movieModel.findById(id);
			if (movie) {
				res.status(200).json(movie);
			} else {
				throw new Error('Not Found');
			}
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}

	async deleteMovie(req, res) {
		try {
			let movieId = req.params.id;
			const movie = await movieModel.findByIdAndDelete(movieId, req.body);
			if (movie) {
				res.status(200).json({ message: 'Deleted', status: 200, data: movie });
			} else {
				throw new Error('Not Found');
			}
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}
}

module.exports = MovieController;
