const mongoose = require('mongoose');

class DB {
	constructor(url) {
		this.url = url;
	}

	async connect(url) {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
	}
}

module.exports = DB;
