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

const GOOGLE_OAUTH = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
}

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FRONT_END_URL = process.env.FRONT_END_URL;

module.exports = {
  SALT,
  SECRET,
  CLOUDINARY,
  GOOGLE_OAUTH,
  MONGODB_URI,
  ADMIN_EMAIL,
  FRONT_END_URL
};