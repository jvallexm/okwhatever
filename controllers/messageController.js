const db = require('../models/index');

/* Database controllers for messages */

module.exports = {

    /* Returns user's inbox */

    inbox: function(user,cb){

        db.message.findAll({where: {toId: user}, include: [db.user]})
                  .then(inbox => cb(inbox));

    },

    /* Returns user's sent message */

    outbox: function(user,cb){

        db.message.findAll({ where: { fromId: user }, include: [{model: db.user, as: "to"}]})
                  .then(inbox => cb(inbox));

    },

    /* Returns the number of unread messages */

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