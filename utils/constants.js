require('dotenv').config({ path: `${__dirname}/../.env` });

const bycript = require('bcryptjs');
const salt = bycript.genSaltSync(10);
const secret = process.env.JWT_SECRET;

module.exports = { salt, secret };