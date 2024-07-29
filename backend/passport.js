const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });
    if (user) {
        return done(null, user);
    }
    const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value
    });
    await newUser.save();
    done(null, newUser);
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ facebookId: profile.id });
    if (user) {
        return done(null, user);
    }
    const newUser = new User({
        facebookId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value
    });
    await newUser.save();
    done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
