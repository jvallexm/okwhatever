module.exports = function(passport,app){
    app.get('/auth/facebook',
        passport.authenticate('facebook'));
 
    app.get('/auth/facebook/callback?',
    (req,res)=>{
        res.send("ding");
    });
}