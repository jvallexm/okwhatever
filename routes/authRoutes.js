const FacebookStrategy = require("passport-facebook").Strategy;
const passport         = require("passport");

module.exports = function(app,jwt){

    const secret = {
        'secret': 'secret'
    }

    passport.serializeUser(function(user, done) {
        console.log("serialize user");
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        console.log("deserialize user");
        done(null, user);
    });

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['email','birthday','first_name','location','picture']
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(JSON.stringify(profile));
        if (profile) {
            user = profile;
            user.my_token = "test";
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
            let token = req.user.my_token;
            console.log(`sending token ${token}`);
            res.send(token);
    });
}