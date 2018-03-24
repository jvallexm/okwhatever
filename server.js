

app.get('/foo',(req,res)=>{

});const express      = require("express");
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
//})

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );
app.use(cookieParser())


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/authRoutes.js')(app,jwt);

app.get('/test',(req,res)=>{
    console.log(`test request token ${req.user}`);
    res.sendFile( path.join(__dirname + `/public/test.html`));
});

app.use((req,res,next)=>{

    let token = req.cookies.auth;
    console.log("token " + token);
    if(token){
        jwt.verify(token,"secret",(err,data)=>{
            if(err)
                return res.send(err);
            else{
                req.user_data = data;
                next();
            }
        })
    } else {

        return res.redirect("/test");

    }

});

app.get('/login',(req,res)=>{

    res.send(req.user_data);
    
});

app.get('/foo',(req,res)=>{

    res.send(req.user_data);    

});
