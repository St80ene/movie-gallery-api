import Joi from 'joi';

const isValidDetails = Joi.object({
	// video: Joi.string().min(3).required(),
	title: Joi.string().min(3).max(30).required(),
	description: Joi.string().min(3).required(),
});

const movieValidation = (req, res, next) => {
	const validation = isValidDetails.validate(req.body);
	if (validation.error) {
		return res.status(400).json({
			error: validation.error.details.map((error) =>
				error.message.replace(/"/g, '')
			),
		});
	}
	next();
};

module.exports = movieValidation;