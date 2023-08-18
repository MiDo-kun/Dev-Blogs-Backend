require('dotenv').config({ path: `${__dirname}/../.env` });

const bycript = require('bcryptjs');

const SALT = bycript.genSaltSync(10);
const SECRET = process.env.JWT_SECRET;

const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
  FOLDER_NAME: process.env.CLOUDINARY_FOLDER_NAME
}

module.exports = { SALT, SECRET, CLOUDINARY };