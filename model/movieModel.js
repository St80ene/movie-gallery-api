const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	video: {
		type: String,
		min: 3,
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
		type: String,
		min: 3,
		required: true,
	},
	format: {
		type: String,
		min: 3,
		max: 5,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('movie', movieSchema);
