require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');
const PORT = process.env.PORT;

app.use(cors({
  credentials: true,
  origin: ALLOWED_ORIGINS,
}));

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use('/uploads', express.static('./public'));

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);

app.get('/', (_, res) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Application is running at PORT ${PORT}`));