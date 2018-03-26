const FacebookStrategy = require("passport-facebook").Strategy;
const passport         = require("passport");
const jwt              = require('jsonwebtoken');
const path             = require('path');
const db               = require('../models/index');

module.exports = function(app){

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

    /* Passport Facebook Strategy */

    passport.use(new FacebookStrategy({

        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback", 
        profileFields: ['email','birthday','first_name','age_range','about','location','picture.type(large)','likes','music','movies','television']

      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(JSON.stringify(profile)); // Logs profile data
    
        if (profile) {
            user = profile; // Sets the user to be the returned profiles
            // Creates a JWT for the user
            user.my_token = jwt.sign( {id: user.id},
                                      process.env.COOKIE_SECRET,
                                      {expiresIn:86400}          );
            user.user_id = user.id; // Saves the user is to be set as a client side cookie
            return cb(null, user);  // Returns the user
        }
        else {
            return cb(null, false);
        }
      }
    ));

    app.use( passport.initialize() );
    app.use( passport.session()    );

    app.get('/auth/facebook', passport.authenticate('facebook',{authType: 'rerequest', scope: ['user_likes','public_profile','user_birthday','user_location','user_photos','user_actions.music','user_actions.movies'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {

            let token = req.user.my_token;
            console.log("token " + token);
            res.cookie('auth',token,{httpOnly: false}); // Sets JWT token to be ready by server as cookie
            res.cookie('id',req.user.user_id);          // Sets the id as a token to be ready by the client as a cookie
            db.user.findAll({where: {id: req.user.user_id}})
                    .then(arr=>{

                        if(arr.length === 0){

                            db.user.create({
                                
                                name:  req.user.first_name,
                                id:    req.user.user_id,
                                image: req.user.picture.data.url

                            }).then(r=>res.send("made user!"))
                              .catch(err=>res.send(err));

                        } else {

                            res.send("hey you're already in woo there");

                        }

                    });           // Redirects to login

    }); 

    /* Middlewear to send users back to /login who have not been authorized */

    app.use((req,res,next)=>{

        let token = req.cookies.auth;
        console.log("token " + token);
        if(token){
            jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{
                if(err)
                    return res.send(err);
                else{
                    req.user_data = data;
                    next();
                }
            });
        } else {
    
            return res.redirect("/login");
    
        }
    
    });

}