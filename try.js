app.post('/upload', fileUpload.single('image'), function (req, res, next) {
	let streamUpload = (req) => {
		return new Promise((resolve, reject) => {
			let stream = cloudinary.uploader.upload_stream((error, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			});

			streamifier.createReadStream(req.file.buffer).pipe(stream);
		});
	};

	async function upload(req) {
		let result = await streamUpload(req);
		console.log(result);
	}

	upload(req);
});
