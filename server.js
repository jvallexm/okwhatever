const express      = require("express");
const port         = process.env.PORT || 8080; // Initialize the port
const app          = express();                // Initializes express
const bodyParser   = require("body-parser");
const path         = require("path");
const exphbs       = require("express-handlebars");
const env          = require('dotenv').config();
const cookieParser = require('cookie-parser')
const db           = require("./models");
const server       = require('http').createServer(app);
const io           = require('socket.io')(server);

db.sequelize.sync().then(()=>{

  server.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog
  
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

require( './routes/ioRoutes.js'   )(io)
require( './routes/authRoutes.js' )(app,path);
require( './routes/apiRoutes.js'  )(app);
require( './routes/htmlRoutes.js' )(app);
