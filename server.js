const express      = require("express");
const port         = process.env.PORT || 8080;           // Initialize the port
const app          = express();                          // Initializes express
const bodyParser   = require("body-parser");             // Body Parser
const path         = require("path");                    // Path
const exphbs       = require("express-handlebars");      // Express hHandlebars for routing
const env          = require('dotenv').config();         // Dot env file
const cookieParser = require('cookie-parser')            // Cookie Parser
const db           = require("./models");                // Sequelize database routes
const server       = require('http').createServer(app);  // Creates a server for socket.io
const io           = require('socket.io')(server);       // Creates socket.io server

db.sequelize.sync().then(()=>{  // Initializes mysql database

  server.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog
  
});

/* Express Middlewear */

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );
app.use( cookieParser()                                 );

/* Engine for handlebars layouts */

const engine = {

    defaultLayout: "main",
    partialsDir: path.join(__dirname + `/views/partials`)

};

/* Handlebars Middlewear */

app.engine("handlebars", exphbs(engine));
app.set("view engine", "handlebars");

require( './routes/ioRoutes.js'   )(io)
require( './routes/authRoutes.js' )(app,path);
require( './routes/apiRoutes.js'  )(app);
require( './routes/htmlRoutes.js' )(app);

module.exports = app;
