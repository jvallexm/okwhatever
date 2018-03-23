const FacebookStrategy = require("passport-facebook").Strategy;
const passport         = require("passport");

module.exports = function(app,session){

    passport.serializeUser(function(user, done) {
        console.log("serialize user");
        session.user = user;
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        console.log("deserialize user");
        done(null, user);
    }); //Hot Poppers

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['email','birthday','first_name','location','picture','likes']
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(JSON.stringify(profile));
        if (profile) {
            user = profile;
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
      }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['user_likes','public_profile','user_birthday','user_location'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
    });
}