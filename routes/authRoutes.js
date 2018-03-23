const FacebookStrategy = require("passport-facebook").Strategy;
const passport         = require("passport");

module.exports = function(app){

    

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(JSON.stringify(profile));
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
      }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
    });
}