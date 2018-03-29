const jwt          = require('jsonwebtoken');

module.exports = function(io){

    const users = [];

    io.on("connection",(client)=>{
        console.log("Someone done connected");
        users.push(client);
        console.log("total users " + users.length);
        let cookie = client.handshake.headers.cookie;
        let authSplit = cookie.split("auth=")[1];
        let token = authSplit.split(";")[0];
        jwt.verify(token,process.env.COOKIE_SECRET,(err,data)=>{
    
            if(data)
                console.log(data);
    
        });
        
        client.on("disconnect",(client)=>{
            console.log("someone done disconnected");
            users.splice(users.indexOf(client),1);
        });
    
    });



}