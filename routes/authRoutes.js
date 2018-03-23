module.exports = function(passport,app){
    app.get('/auth/facebook',
        passport.authenticate('facebook'));
 
    app.get('/auth/facebook/callback?',(req,res)=>{
        req.session.logged_in = true;
        console.log(req.body);
        res.send("fff");
    });
}