const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy   = require('passport-google-oauth20').Strategy;
const passport         = require("passport");
const jwt              = require('jsonwebtoken');
const db               = require('../models/index');

module.exports = function(app,path){

    /* Will always send login first */

    app.get('/login',(req,res)=>{

        res.sendFile( path.join(__dirname + `/../public/login.html`));
        
    });

    /* Passport Serialize User */

    passport.serializeUser(function(user, done) {

        console.log("serialize user");
        done(null, user);

    });

    /* Passport Deserialize User */
      
    passport.deserializeUser(function(user, done) {

        console.log("deserialize user");
        done(null, user);

    });

   

    /* Passport Google Strategy */

    passport.use(new GoogleStrategy({

        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/google/callback"

      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile); // Logs profile data
        user = profile;
        if (profile) {
            user = profile; // Sets the user to be the returned profiles
            // Creates a JWT for the user
            user.my_token = jwt.sign( {id: user.id},
                                      process.env.COOKIE_SECRET,
                                      {expiresIn: 86400}          );
            user.user_id = user.id; // Saves the user is to be set as a client side cookie
            return cb(null, user);  // Returns the user
        }
        else {
            return cb(null, false); //fff
        }
      }
    ));


    app.use( passport.initialize() );
    app.use( passport.session()    );

    app.get('/auth/facebook', passport.authenticate('facebook',{authType: 'rerequest', scope: ['public_profile','photos'] }));

    app.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {

            let token = req.user.my_token;
            res.cookie('auth',token,{httpOnly: false}); // Sets JWT token to be ready by server as cookie
            res.cookie('id',req.user.user_id);          // Sets the id as a token to be ready by the client as a cookie
            
            db.user.findAll({where: {id: req.user.user_id}})
                   .then(arr=>{

                        console.log(req.user._json);
                        
                        if(arr.length === 0){

                            let insert = {
                                
                                id: req.user.id,
                                name: req.user.name.givenName,
                                image: req.user.photos[0].value.split("?")[0]

                            };
                            console.log(insert);
                            db.user.create(insert).then(res.sendFile(path.join(__dirname + `/../public/redirect.html`)));

                        } else {

                            res.sendFile(path.join(__dirname + `/../public/redirect.html`));

                        }

                    });           // Redirects to login

    });

    app.get('/auth/google',   passport.authenticate('google',{scope: ['profile'] }));


    /* Middlewear to send users back to /login who have not been authorized */

    app.use((req,res,next)=>{

        let token = req.cookies.auth;
        console.log("token " + token);
        if(token){

            jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{

                if(err) {

                    console.log("*** JWT Error ***")
                    console.log(err);
                    return res.redirect("/login");

                } else {

                    req.user_data = data;
                    next();

                }
            });

        } else {
    
            return res.redirect("/login");
    
        }
    
    });

}