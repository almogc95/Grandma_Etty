const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const UserModel = require('./src/models/google_model');
const dotenv = require('dotenv');
dotenv.config({
    path: '.env'
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
},
    // (accessToken, refreshToken, profile, done) => {
    //     UserModel.findOne({ googleId: profile?.id }).then((existingUser) => {
    //         if (existingUser) {
    //             done(null, existingUser);
    //         } else {
    //             new UserModel({
    //                 googleId: profile?.id,
    //                 displayName: profile?.displayName,
    //                 email: profile?.emails[0].value,
    //             }).save().then((user) => done(null, user));
    //         }
    //     });
    // }

    //old code
    function (request, accessToken, refreshToken, profile, done) {
        new UserModel({
            username: profile.displayName,
            googleId: profile.id
        }).save().then((newUser) => {
            console.log(`new user created: ${newUser}`);
        });
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});