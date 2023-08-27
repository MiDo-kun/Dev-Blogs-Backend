const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ADMIN_EMAIL } = require('./env-variables');
const { GOOGLE_OAUTH } = require('./env-variables');

function GoogleOAuth() {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_OAUTH.CLIENT_ID,
    clientSecret: GOOGLE_OAUTH.CLIENT_SECRET,
    callbackURL: GOOGLE_OAUTH.CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    
    const user = {
      _id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      profile: profile.photos[0].value,
    };
    
    try {
      const userDoc = await User.findById(user._id);
      // If no user document has been found then create one
      if (!userDoc) {
        const createUser = await User.create({
          _id: user._id,
          role: ADMIN_EMAIL === user.email ? 'admin' : 'subscriber',
          name: user.name,
          photo: user.profile
        });

        return done(null, createUser)
      }

      return done(null, userDoc)
    } catch (err) {
      done(err.message);
    }
  }));
}

module.exports = { GoogleOAuth };