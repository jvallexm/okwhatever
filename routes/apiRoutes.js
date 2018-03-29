const db = require("../models/index");

module.exports = function(app){

    app.post("/api/send", (req,res)=>{

        console.log("creating a new message");
        console.log(req.body);

        let flirt = false;

        if(req.body.flirt == "true")
            flirt = true;
            
        db.message.create({

            id: req.user_data.id + new Date().getTime(),
            fromId: req.user_data.id,
            toId: req.body.id,
            inboxTo: true,
            inboxFrom: true,
            text: req.body.text,
            readTo: false,
            readFrom: true,
            isFlirt: flirt,
            userId: req.user_data.id

        }).then(user => res.send("ding"));
        
    });

    //get single user
    app.get('/api/profile/:id',(req,res)=>{
        db.user.findAll({ where: { id: req.params.id }})
               .then(results => res.json(results[0]));
    });

    //updating a user
    app.post('/api/profile/update',(req,res)=>{

        console.log("updating user");
        
        if(req.user_data){

            console.log(req.user_data.id);
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
            
        } else {

            console.log("You're not logged in!");
            console.log(req.body);
            res.send("ding");
            
        }
        
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

    app.get(`/api/allmessages`,(req,res)=>{

        db.message.findAll({include: [db.user, {model: db.user, as: 'to'}]}).then(r=>res.json(r));

    });

}