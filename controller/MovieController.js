const DB = require('../db');

class MovieController {
	constructor() {
		//
	}

	async createMovie(req, res) {
		const { video, title, description, duration, format } = req.body;
		try {
			let movie = await new DB().movie.findOne({ video });
			if (movie) {
				res.status(400).json({
					status: 400,
					message: 'Movie already saved',
				});
				return;
			}
			await new DB().movie.create(
				{
					video,
					title,
					description,
					duration,
					format,
				},
				{ new: true }
			);
            res.status(200).json({ message: 'Video saved' });
            return
		} catch (error) {
			console.log('error => ', error.message);
			res.status(400).json(error.message);
		}
	}

	async updateMovie(req, res) {
		try {
			let movieId = req.params.id;
			const movie = await new DB().movie.findByIdAndUpdate(movieId, req.body);
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
			const movie = new DB().movie.find();
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
			const movie = await new DB().movie.findById(id);
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
			const movie = await new DB().movie.findByIdAndDelete(movieId, req.body);
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
