const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	videoUrl: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		min: 3,
		max: 30,
		required: true,
	},
	description: {
		type: String,
		min: 3,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	format: {
		type: String,
		min: 3,
		max: 5,
		required: true,
	},
	publicId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('movie', movieSchema);
