const express     = require("express");
const port        = process.env.PORT || 8080; // Initialize the port
const app         = express();                // Initializes express
const bodyParser  = require("body-parser");
const path        = require("path");
const exphbs      = require("express-handlebars");
const env         = require('dotenv').config();
const jwt         = require('jsonwebtoken')

app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/authRoutes.js')(app,jwt);

app.get('/test',(req,res)=>{
    console.log(`test request token ${req.user}`);
    res.sendFile( path.join(__dirname + `/public/test.html`));
});

app.get('/',(req,res)=>{
    
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        res.status(200).send(decoded);
    });
    
});