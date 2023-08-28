const cloudinary = require('cloudinary').v2;
const { CLOUDINARY } = require('./env-variables.js');
const fs = require('fs');

// Cloudinary Config
cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET
});

async function uploadImage(id, image) {
  const result = await cloudinary.uploader.upload(image, {
    folder: 'dev-blogs',
    transformation: [
      { width: 600, height: 340, crop: "fill" },
      { quality: "auto" }, // compress the image before saving to the server.
    ],
    public_id: id,
  });

  // Remove cover from the upload folder
  fs.unlinkSync(`${__dirname}/../${image}`);

  return result.secure_url;
}

async function removeImage(id) {
  const folder = CLOUDINARY.FOLDER_NAME;
  const response = await cloudinary.uploader.destroy(`${folder}/${id}`)
  return response;
}

module.exports = { uploadImage, removeImage };