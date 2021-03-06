const movieModel = require('../model/movieModel');
const cloudinary = require('../lib/cloudinaryConfig');
const streamifier = require('streamifier');

class MovieController {
	constructor() {
		this.cloudinary_folderName = 'KEYLA-Technologies-test';
	}
	
	upload = async (req, res) => {
		const requestBody = req.body.text || req.body;
		// request from ui
		if (Array.isArray(requestBody)) {
			var [title, description] = requestBody; 
		} else {
			// request from postman
			var { title, description } = requestBody; 
		}
		try {
			//checking database for duplicate
			const movie = await movieModel.findOne({ title });
			if (movie) {
				res.status(400).json({
					status: 400,
					message: 'title already exists',
					data: {},
				});
				return;
			}

			const uploadedVideo = await this.streamUpload(req);
			const { url, duration, format, public_id, width, height } = uploadedVideo;

			const savedVideo = await movieModel.create({
				videoUrl: url,
				title,
				description,
				duration,
				format,
				publicId: public_id,
			});

			res.status(201).json({
				status: 201,
				message: 'uploaded successfully',
				data: savedVideo,
				meta: { width, height },
			});
			return;
		} catch (error) {
			res.status(400).json({ status: 400, message: error });
		}
	};

	streamUpload(req) {
		return new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream(
				{ resource_type: 'video', folder: this.cloudinary_folderName},
				(error, response) => {
					if (response) {
						resolve(response);
					} else {
						reject(error);
					}
				}
			);
			streamifier.createReadStream(req.file.buffer).pipe(stream);
		});
	}

	async updateMovie(req, res) {
		try {
			let movieId = req.params.id;
			const movie = await movieModel.findByIdAndUpdate(
				movieId,
				req.body,
				{ new: true }
			);
			if (movie) {
				res
					.status(201)
					.json({ status: 200, message: 'updated successfully', data: movie });
			} else {
				throw new Error('Not Found');
			}
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}

	async getMovies(_req, res) {
		try {
			const movies = await movieModel.find();
			res.status(200).json({
				status: 200,
				message: 'retrieved successfully',
				data: movies,
			});
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message, data: {} });
		}
	}

	async getMovieById(req, res) {
		try {
			const id = req.params.id;
			const movie = await movieModel.findById(id);
			if (movie) {
				res.status(200).json({
					status: 200,
					message: 'retrieved successfully',
					data: movie,
				});
			} else {
				res.status(404).json({ status: 404, message: 'Not found', data: {} });
			}
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message, data: {} });
		}
	}

	deleteMovie = async(req, res) => {
		try {
			const {public_id} = req.params;
			const publicId = `${this.cloudinary_folderName}/${public_id}`;
			// check if video exist in database
			const foundMovie = await movieModel.findOne({ publicId });
			if (foundMovie) {
				// delete it from cloudinary
				cloudinary.uploader.destroy(
					publicId,
					{ resource_type: 'video' },
					async (error, response) => {
						// if deleted on cloudinary, then delete from database
						if (response) {
							await movieModel.findOneAndDelete({
								publicId,
							});

							res.status(200).json({
								status: 200,
								message: 'Deleted successfully',
								data: { publicId },
							});
						} else {
							// if there's an error from cloudinary
							res.status(400).json({
								status: 400,
								message: error || 'cloudinary could not delete the video',
								data: {},
							});
						}
					}
				);
			} else {
				// if video does not exist in the database
				res.status(404).json({
					status: 404,
					message: 'Not found',
					data: {},
				});
			}
		} catch (error) {
			res.status(400).json({ status: 400, message: error.message });
		}
	}
}

module.exports = MovieController;
