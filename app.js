require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const cors = require('cors');
const passport = require("passport");

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const mongodb = require('./config/mongo-db.js');

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');
const PORT = process.env.PORT;

mongodb.connect();

// Initialize passport and use OAuth strategies
app.use(passport.initialize());
require('./config/passport-auth').GoogleOAuth();

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(express.json());

app.get('/', (_, res) => {
  res.sendStatus(404);
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => console.log(`Application is running at PORT ${PORT}`));