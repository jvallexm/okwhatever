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
const jwt          = require('jsonwebtoken');

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

/* Will always send login first */

app.get('/login',(req,res)=>{

    res.sendFile( path.join(__dirname + `/public/login.html`));
    
});

require( './routes/authRoutes.js'   )(app,path);

io.on("connection",(client)=>{
    console.log("Someone done connected");
    let cookie = client.handshake.headers.cookie;
    let authSplit = cookie.split("auth=")[1];
    let token = authSplit.split(";")[0];
    jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{

        if(data)
            console.log(data);

    })

});

require( './routes/apiRoutes.js'    )(app);
require( './routes/htmlRoutes.js'   )(app);
