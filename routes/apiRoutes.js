const db = require("../models/index");

module.exports = function(app){

    app.post("/api/new", (req,res)=>{
        console.log("creating a new user");
        db.user.create({
            id: "placeholder",
            image: "placeholder",
            name: "placeholder"
        }).then(user => res.redirect("/"))
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
        console.log(req.body);
        let id = req.user_data.id;
        let update = req.body;
        if(update.birthday && update.bio && update.gender && update.faves && update.city && update.state)
            update.complete = true;
        db.user.update(
            update,
            {where: {id: id}}
        )
        .then(result => res.json(result))
        .catch(err => res.json(err));
    });

    //get all users
    app.get('/api/users',(req,res)=>{
        db.user.findAll({}).then(results => res.json(results));
    });

    app.get('/api/messages/:user',(req,res)=>{

    });

    app.post('/api/messages/:user',(req,res)=>{
        
    });

}