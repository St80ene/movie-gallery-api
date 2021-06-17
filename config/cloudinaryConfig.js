require('dotenv').config();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
	cloud_name: process.env.CLOUD_NAME || 'db14zb9ji',
	api_key: process.env.CLOUD_API_KEY || '574885582731744',
	api_secret: process.env.CLOUD_API_SECRET || '4_OxUWzHJ7FTNdx5Z0zr47JwKBg',
});



// exports.uploads = (file) => {
// 	return new Promise((resolve) => {
// 		cloudinary.uploader.upload(
// 			file,
// 			(result) => {
// 				resolve({ url: result.url, id: result.public_id });
// 			},
// 			{ resource_type: 'video', chunk_size: 6000000 }
// 		);
// 	});
// };

module.exports = cloudinary;
