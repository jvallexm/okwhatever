const jwt          = require('jsonwebtoken');

module.exports = function(io){

    function parseClientCookie(client,cb){
        
        let cookie    = client.handshake.headers.cookie;
        let authSplit = cookie.split("auth=")[1];
        let token     = authSplit.split(";")[0];

        jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{
    
            if(data)
               cb(data);
    
        });
        

    }

    const users = [];

    io.on("connection",(client)=>{

        if(client.handshake.headers.cookie){

            console.log("Someone done connected");
            
            parseClientCookie(client,(data)=>{

                client.user_data = data;
                console.log("*** adding user ***");
                console.log(client);
//              console.log(client.user_data);
                users.push(client);
                console.log("total users " + users.length);

            });

        } else {

            console.log("Anonymous done connected");

        }

        client.on("send message",(message)=>{

            users.forEach(i=>{
                if(i.user_data.id === message.toId){
                    
                }
            })

        });

        client.on("disconnect",(client)=>{

            console.log("someone done disconnected");
            users.splice(users.indexOf(client),1);
                
        });
        
    });



}