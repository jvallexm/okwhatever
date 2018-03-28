const db = require('../models/index');

module.exports = {

    findOne: function(req,cb){

        db.user.findAll({where: {id: req.user.id}})
               .then(arr=>{

                    cb(arr[0]);

               })

    }

}