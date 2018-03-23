const express          = require("express");
const port             = process.env.PORT || 8080; // Initialize the port
const app              = express();                // Initializes express
const bodyParser       = require("body-parser");
const path             = require("path");
const exphbs           = require("express-handlebars");
const passport         = require("passport");
const env              = require('dotenv').config();
const FacebookStrategy = require("passport-facebook").Strategy;

app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(JSON.stringify(profile));
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback?',
  (req,res)=>{
      res.send("ding");
  });


app.get('/test',(req,res)=>{
    res.sendFile( path.join(__dirname + `/public/test.html`));
});
