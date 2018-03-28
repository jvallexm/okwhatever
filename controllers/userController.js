const db = require('../models/index');

module.exports = {

    findOne: function(req,cb){

        db.user.findAll({where: {id: req.user_data.id}})
               .then(arr=>{


                cb(arr[0]);

            });

    },

    findAll: function(req,cb){

        db.user.findAll({})
            .then(arr=>{

                cb(arr[0]);
        })
    },

    

}