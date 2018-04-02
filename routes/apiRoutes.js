const db = require("../models/index");

module.exports = function(app){

    /* Route to snd a new message */

    app.post("/api/send", (req,res)=>{

        console.log("creating a new message");

        let flirt = req.body.flirt ? true : false; // If the message is a flirt or not 

        /* New message to be sent to the database */
            
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

        }).then(user => res.send(true)); // Sends true when the user has been created
        
    });

    /* Updating the profile of a single user */

    app.post('/api/profile/update',(req,res)=>{

        console.log("updating user");
        
        if(req.user_data){

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
            res.send(false);
            
        }
        
    });

    /* Updates messages so that they are shown as 'read' in /inbox */

    app.post('/api/message/read',(req,res)=>{

        db.message.update({readTo: true},{where: {id: req.body.id}})
                  .then((r)=>{
                      res.send("ding");
                  })

    });

}