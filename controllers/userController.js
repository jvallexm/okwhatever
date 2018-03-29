const db = require('../models/index');

/* Controllers for users database */

module.exports = {

    /* Find and return a single user */

    findOne: function(req,cb){

        db.user.findAll({where: {id: req.user_data.id}})
               .then(arr=>{


                cb(arr[0]);

            });

    },

    /* find and return all users */

    findAll: function(req,cb){

        db.user.findAll({})
            .then(arr=>{

                cb(arr);
        });
        
    },

    

}