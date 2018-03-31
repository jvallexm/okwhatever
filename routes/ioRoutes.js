const jwt  = require('jsonwebtoken');
const db   = require('../models/index');

module.exports = function(io){

    function parseClientCookie(client,cb){
        
        if(cookie.indexOf("auth") > -1){

            let cookie    = client.handshake.headers.cookie;
            let authSplit = cookie.split("auth=")[1];
            let token     = authSplit.split(";")[0];

            jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{
        
                if(data)
                cb(data);
        
            });

        } else {

            return false;

        }
        

    }

    const users = [];

    io.on("connection",(client)=>{

        if(client.handshake.headers.cookie){

            console.log("Someone done connected");
            
            parseClientCookie(client,(data)=>{

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

        client.on("send message",(message)=>{

            console.log("Message done been sent");
            console.log(message);
            
            users.forEach(i=>{
                //console.log(`#### checking if ${message.fromId} is ${i.user_data.id} ####`)
                if(i.user_data.id == message.toId){
                    db.user.findAll({where: {id: message.fromId}})
                           .then(arr=>{
                               console.log("I found that one!");
                               client.broadcast.to(i.id).emit("new message",arr[0])
                           });
                }
            });

        });

        client.on("disconnect",(client)=>{

            console.log("someone done disconnected");
            users.splice(users.indexOf(client),1);
                
        });
        
    });



}