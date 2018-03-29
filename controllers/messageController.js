const db = require('../models/index');

module.exports = {

    inbox: function(user,cb){

        db.message.findAll({where: {toId: user}, include: [db.user]})
                  .then(inbox => cb(inbox));

    },

    outbox: function(user,cb){

        db.message.findAll({ where: { fromId: user }, include: [{model: db.user, as: "to"}]})
                  .then(inbox => cb(inbox));

    },

    unread: function(user,cb){

        db.message.findAll({where: {toId: user},
            include: [db.user]})
                 .then(inbox => {
                     
                    let unread = 0;

                    inbox.forEach(i=>{

                        if(!i.readTo){
                            unread++;
                        }

                    });

                    cb(unread);

                 });


    }

}