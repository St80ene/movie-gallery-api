const multer = require('multer')
// const path = require('path')

//create a storage space for files

// const videoStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		if (file.mimetype === 'video/mp4') {
// 			cb(null, path.join(__dirname, '../Videos'));
// 		}
// 		cb({ message: 'This file is not in video format.' }, false);
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname);
// 	},
// });



// module.exports = { videoUpload: multer({ storage: videoStorage }) };

const uploadFile =  (req, res, next) => {
let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
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
};

async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
}

upload(req);
}