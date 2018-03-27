module.exports = function(app){
    

    // Route to edit your profile
    app.get(`/edit`,(req,res)=>{

        let user = req.user_data.id;

    });

    // Middlewear to redirect to edit page if incomplete profile

    app.use((req,res,next)=>{

        // If you profile isn't complete...

        //res.redirect(`/edit`);

        //else

        //next();


    });

    // If logged in defaults to...

    app.get(`/`,(req,res)=>{

        res.redirect(`/matches`);

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
        

    // 404ED!!!

    app.get(`*`,(req,res)=>{

        res.sendStatus(404).send("404ed!");

    });


}