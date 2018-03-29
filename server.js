const express      = require("express");
const port         = process.env.PORT || 8080; // Initialize the port
const app          = express();                // Initializes express
const bodyParser   = require("body-parser");
const path         = require("path");
const exphbs       = require("express-handlebars");
const env          = require('dotenv').config();
const cookieParser = require('cookie-parser')
const db           = require("./models");

db.sequelize.sync().then(()=>{

  app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog
  
});

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );
app.use( cookieParser()                                 );

const engine = {

    defaultLayout: "main",
    partialsDir: path.join(__dirname + `/views/partials`)

};

app.engine("handlebars", exphbs(engine));
app.set("view engine", "handlebars");

/* Will always send login first */

app.get('/login',(req,res)=>{

    res.sendFile( path.join(__dirname + `/public/login.html`));
    
});

require( './routes/authRoutes.js'   )(app,path);

const server = require('http').createServer(app);
const io = require('socket.io')

io.on("connection",()=>{
    console.log("Someone done connected");
})
server.listen(port);

require( './routes/apiRoutes.js'    )(app);
require( './routes/htmlRoutes.js'   )(app);
