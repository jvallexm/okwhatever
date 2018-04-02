const db       = require('../models/index');
const User     = require('../controllers/userController');
const Message  = require('../controllers/messageController');
const path     = require('path');

module.exports = function(app){
    
    // Route to edit your profile
    app.get(`/edit`,(req,res)=>{

        let user = req.user_data.id;

        if(req.user_data){

            User.findOne(req,(you)=>{
                
                
                Message.unread(you.id,(unread)=>{

                    if(unread > 0)
                        you.unread = unread;

                    res.render("edit",{you:  you});

                });

            });

        }

    });

    // Middlewear to redirect to edit page if incomplete profile    

    app.use(`/`,(req,res,next)=>{

        User.findOne(req,(r)=>{
            if(r)
                if(r.complete)
                    next();
            else{
                User.findOne(req,(you)=>{
                    res.render("edit",{
                        you: you,
                        message: "You need to finish your profile before you can do anything else!"
                    })
                })
            }
        })

    });

    // If logged in defaults to...

    app.get(`/`,(req,res)=>{

        res.redirect(`/matches`);

    });

    // Route to check inbox

    app.get(`/inbox`,(req,res)=>{
        
        if(req.user_data){

            let user = req.user_data.id; // References user's id

            Message.inbox(user,(inbox)=>{ 

                User.findOne(req,(r)=>{

                    let send = {

                        /* Sorts messages so that the newest is displayed first */

                        message: inbox.sort((a,b)=>{
                            if(a.createdAt > b.createdAt)
                                return -1;
                            else
                                return 1;
                        }),
                        you: r,
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
                        send.you.unread = unread;
                    
                    res.render("messages",send);

                })

            });

        }

    });

    /* Sends a list of the messages a user has sent */

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
                        you: r,
                        title: "Sent",
                        inbox: false
                    }
                    
                    Message.unread(user,(unread)=>{

                        if(unread > 0)
                            send.you.unread = unread;

                        res.render("messages",send);
                        
                    })
                    

                });

            });

        }

    });

    // Route to screen of matches

    app.get(`/matches`,(req,res)=>{

        if(req.user_data){

            User.findAll(req,(r)=>{
                
                let itYou = req.user_data.id; // Your id
 
                let you; // Obect that holds the user's data

                let matches = []; // List of matches 

                let now  = new Date(); // Current date

                /* Function to render user's ages */

                function dateDiffInYears(dateold, datenew) {
                    var ynew = datenew.getFullYear();
                    var mnew = datenew.getMonth();
                    var dnew = datenew.getDate();
                    var yold = dateold.getFullYear();
                    var mold = dateold.getMonth();
                    var dold = dateold.getDate();
                    var diff = ynew - yold;
                    if (mold > mnew) diff--;
                    else {
                        if (mold == mnew) {
                            if (dold > dnew) diff--;
                        }
                    }
                    return diff;
                }

                /* Sorts all matches for ones who are not the user, sets the user object with their data */

                for(let i=0;i<r.length;++i){

                    if(r[i].id === itYou){

                        you = r[i];

                    } else if(r[i].complete) {

                        let faves = r[i].faves.split(";;;").join(" - "); // Makes favorites readable
                        r[i].faves = faves;
                        let birthYear = new Date(r[i].birthday * 1000);
                        r[i].age = dateDiffInYears(birthYear,now); // Dynamically creates the user's age 
                        matches.push(r[i]);
                        
                    }

                }

                Message.unread(itYou,(unread)=>{

                    if(unread > 0)
                        you.unread = unread;

                    res.render("matches",{you:  you,
                                          match: matches.sort((a,b)=>{
                                            if(a.createdAt > b.createdAt)
                                                    return -1;
                                                else
                                                    return 1;
                                          })
                    });

                });
                
    
            });

        }

    });

    // Route to logout


    app.get(`/logout`,(req,res)=>{



    });


    /* Sends the 404 Page for all other routes */

    app.get(`*`,(req,res)=>{

        res.sendFile( path.join(__dirname + `/../public/404.html`));

    });

}