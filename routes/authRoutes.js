const FacebookStrategy = require("passport-facebook").Strategy;
const passport         = require("passport");

module.exports = function(app){

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log("AAAA");
        console.log(JSON.stringify(profile));
      }
    ));

    app.get('/auth/facebook',passport.authenticate('facebook'));
 
    app.get('/auth/facebook/callback?',(req,res)=>{
        res.send("fff");
    });
}