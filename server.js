const express      = require("express");
const port         = process.env.PORT || 8080; // Initialize the port
const app          = express();                // Initializes express
const bodyParser   = require("body-parser");
const path         = require("path");
const exphbs       = require("express-handlebars");
const env          = require('dotenv').config();
const jwt          = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
//const db          = require("./models");

//db.sequelize.sync().then(function(){
  app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog
//}) Error: Dialect needs to be explicitly supplied as of v4.0.0

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );
app.use( cookieParser()                                 );


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/login',(req,res)=>{

    res.sendFile( path.join(__dirname + `/public/login.html`));

});

require( './routes/authRoutes.js'   )(app);
require( './routes/profileCheck.js' )(app);
require( './routes/apiRoutes.js'    )(app)
require( './routes/htmlRoutes.js'   )(app);
