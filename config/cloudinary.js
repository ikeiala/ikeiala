require('dotenv').config()
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "ikeiala",
  api_key: 536681684977952,
  api_secret: "zY-rCtFwMK_k_1MBaWGEe2vEYwY",
  // cloud_name: process.env.CLOUDINARY_NAME,
  // api_key: process.env.CLOUDINARY_KEY,
  // api_secret: process.env.CLOUDINARY_SECRET 
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'ikeiala_users_profile_pics', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;