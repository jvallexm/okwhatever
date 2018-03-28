const db = require("../models/index");

module.exports = function(app){

    app.post("/api/new", (req,res)=>{
        console.log("creating a new message");
        db.message.create({
            id: "placeholder",
            fromId: "placeholder",
            toId: "placeholder",
            inboxTo: "placeholder",
            inboxFrom: "placeholder",
            text: "placeholder",
            readTo: "placeholder",
            readFrom: "placeholder"
        }).then(user => res.redirect("/"));
    });

    //get single user
    app.get('/api/profile/:id',(req,res)=>{
        if (req.params.id){
            db.user.findAll({ where: { id: req.params.id }})
                   .then(results => res.json(results));
        }
    });

    //updating a user
    app.post('/api/profile/update',(req,res)=>{

        console.log("updating user " + req.user_data.id);
        // console.log(req.body);

        let id = req.user_data.id; // Id of the user being updated
        let update = req.body;     // Object being sent to the API

        if(update.birthday && update.bio && update.gender && update.faves && update.city && update.state)
            update.complete = true; // If the required fields are filled out it marks your profile as complete

        db.user.update(  // Updates the db
            update,
            {where: {id: id}}
        )
        .then(result => res.json(true)) // Returns true once it's complete
        .catch(err => res.json(err));   // Otherwise returns the error

    });

    //get all users
    app.get('/api/users',(req,res)=>{
        db.user.findAll({})
               .then(results => res.json(results));
    });

    //get messages sent FROM an id and TO an id:
    app.get('/api/messages/',(req,res)=>{

        let id = req.user_data.id;

        db.message.findAll({ where: { fromId: id }/{ toId: id }})
                  .then(results => res.json(results));
    });
    
//a controller function that:
//takes a request object and a callback function. 

//then sends back in the callback function: 
//the entry in the database for the id of the user passed in the req.user_data object

//exectuting insert into messages....
app.post('/api/messages/:user',(req,res)=>{
    let message = {...req.body,
        id: 1, 
        fromId: " ",
        toId: " " , 
        inboxTo: false, 
        inboxFrom: true, 
        text: "Hey", 
        readTo: true, 
        readFrom: true
    }

    db.message.create(message).then(results => res.json(results))



});

}