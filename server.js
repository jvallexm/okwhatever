const express          = require("express");
const port             = process.env.PORT || 8080; // Initialize the port
const app              = express();                // Initializes express
const bodyParser       = require("body-parser");
const path             = require("path");
const exphbs           = require("express-handlebars");
const passport         = require("passport");
const env              = require('dotenv').config();
const session          = require('express-session');
const parseurl         = require('parseurl')



app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    logged_in: false
}));

require('./routes/authRoutes.js')(passport,app);




app.get('/test',(req,res)=>{
    res.sendFile( path.join(__dirname + `/public/test.html`));
});
