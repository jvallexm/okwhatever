const jwt  = require('jsonwebtoken');
const db   = require('../models/index');

module.exports = function(io){

    /* Parses the jwt of the client and returns their data */

    function parseClientCookie(client,cb){

        let cookie    = client.handshake.headers.cookie;
        
        if(cookie.indexOf("auth") > -1){

            let authSplit = cookie.split("auth=")[1];
            let token     = authSplit.split(";")[0];

            jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{
        
                if(data) cb(data);
        
            });

        } else {

            return false;

        }
        

    }

    const users = []; // Constantly running array of all connected users 

    io.on("connection",(client)=>{

        if(client.handshake.headers.cookie){

            /* If the user has a jwt */

            console.log("Someone done connected");
            
            parseClientCookie(client,(data)=>{

                /* Adds a connected client's userdata to their client object */

                if(data){
                    client.user_data = data;
                    console.log("*** adding user ***");
                    console.log(client.id);
                    console.log(client.user_data);
                    users.push(client);
                    console.log("total users " + users.length);
                }

            });

        } else {

            console.log("Anonymous done connected");

        }

        /* When somone sends a message and it gets posted to the database.. */

        client.on("send message",(message)=>{

            console.log("Message done been sent");
            console.log(message);
            
            /* Tries to find the id of the user the message was sent to with the id from the sent message object */

            users.forEach(i=>{
                //console.log(`#### checking if ${message.fromId} is ${i.user_data.id} ####`)
                if(i.user_data.id == message.toId){
                    db.user.findAll({where: {id: message.fromId}})
                           .then(arr=>{
                               console.log("I found that one!");
                               // If the user is connected it sends a new message and the user object of the sender
                               client.broadcast.to(i.id).emit("new message",arr[0]) 
                           });
                }
            });

        });

        /* Removes clients from the users array after they've disconnected */

        client.on("disconnect",(client)=>{

            console.log("someone done disconnected");
            users.splice(users.indexOf(client),1);
                
        });
        
    });



}