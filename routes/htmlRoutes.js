module.exports = function(app){
    

    // If logged in defaults to...

    app.get(`/`,(req,res)=>{

        res.redirect(`/matches`);

    });


    // Route to edit your profile
    app.get(`/edit`,(req,res)=>{

        let user = req.user_data.id;

    });

    // Route to view a profile

    app.get(`/users/:id`,(req,res)=>{



    });

    // Route to check inbox

    app.get(`/inbox`,(req,res)=>{

        let user = req.user_data.id;

    });

    // Route to screen of matches

    app.get(`/matches`,(req,res)=>{

        res.render("index",{
            test: {
                name: "Hot Poppers",
                image: "hotpoppers.jpg"
            }
        });

    });

    // Route to logout


    app.get(`/logout`,(req,res)=>{



    });

    // Testing routes

    app.get('/test',(req,res)=>{

        res.send(req.user_data);
        
    });
    
    app.get('/foo',(req,res)=>{
    
        res.send(req.user_data);    
    
    });
        

    app.get(`*`,(req,res)=>{


    });


}