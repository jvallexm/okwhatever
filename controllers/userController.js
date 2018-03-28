const db = require("../models/index");

module.exports = function(app){

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