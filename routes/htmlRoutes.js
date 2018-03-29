const db       = require('../models/index');
const User     = require('../controllers/userController');
const Message  = require('../controllers/messageController');

module.exports = function(app){
    
    // Route to edit your profile
    app.get(`/edit`,(req,res)=>{

        let user = req.user_data.id;

        if(req.user_data){

            User.findOne(req,(you)=>{
                
                let result;
    
                if(!you){

                    result = {
                        name: "Hot Poppers",
                        image: "hotpoppers.jpg"
                    }

                } else {
    
                    result = you;
    
                }

                Message.unread(you,(unread)=>{

                    if(unread > 0)
                        result.unread = unread;

                    res.render("edit",{test:  result});

                });

            });

        } else {

            res.render("edit",{
                test: {
                    name: "Hot Poppers",
                    image: "hotpoppers.jpg"
                }
            });

        }   

    });

    // Middlewear to redirect to edit page if incomplete profile    

    // If logged in defaults to...

    app.get(`/`,(req,res)=>{

        res.redirect(`/matches`);

    });

    // Route to view a profile

    app.get(`/users/:id`,(req,res)=>{



    });

    // Route to check inbox

    app.get(`/inbox`,(req,res)=>{
        
        if(req.user_data){
            let user = req.user_data.id;

            Message.inbox(user,(inbox)=>{

                User.findOne(req,(r)=>{

                    let send = {
                        message: inbox.sort((a,b)=>{
                            if(a.createdAt > b.createdAt)
                                return -1;
                            else
                                return 1;
                        }),
                        test: r,
                        title: "Inbox",
                        inbox: true
                    }

                    let unread = 0;

                    inbox.forEach(i=>{

                        if(!i.readTo){
                            unread++;
                        }

                    });

                    if(unread > 0)
                        send.test.unread = unread;
                    
                    res.render("messages",send);

                })

            });

        } else {

            res.render("messages",{
                message: []
            });

        }

    });

    app.get(`/sent`,(req,res)=>{

        
        if(req.user_data){
            let user = req.user_data.id;

            Message.outbox(user,(inbox)=>{

                let newMessages = [];

                inbox.forEach(i=>{

                    i.user = i.to;
                    newMessages.push(i);

                });

                User.findOne(req,(r)=>{

                    let send = {
                        message: newMessages.sort((a,b)=>{
                                        if(a.createdAt > b.createdAt)
                                            return -1;
                                        else
                                            return 1;
                                    }),
                        test: r,
                        title: "Sent",
                        inbox: false
                    }
                    
                    Message.unread(user,(unread)=>{

                        if(unread > 0)
                            send.test.unread = unread;

                        res.render("messages",send);
                        
                    })
                    

                });

            });

        } else {

            res.render("messages",{
                message: []
            });

        }

    });

    // Route to screen of matches

    app.get(`/matches`,(req,res)=>{

        if(req.user_data){

            User.findAll(req,(r)=>{
                
                let you = req.user_data.id;

                let test;

                let matches = [];

                for(let i=0;i<r.length;++i){

                    if(r[i].id === you){
                        test = r[i];
                        //matches.push(r[i]);
                    } else if(r[i].complete) {
                        matches.push(r[i]);
                    }

                }

                Message.unread(you,(unread)=>{

                    if(unread > 0)
                        test.unread = unread;

                    res.render("matches",{test:  test,
                                          match: matches});

                });
                
    
            });

        } else {

            res.render("matches",{
                test: {
                    name: "Hot Poppers",
                    image: "hotpoppers.jpg"
                },
                match: []
            });

        }

        

    });

    // Route to logout


    app.get(`/logout`,(req,res)=>{



    });


    app.get(`*`,(req,res)=>{

        res.send("404ed!");

    });

}