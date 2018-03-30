module.exports = function(sequelize, DataTypes){

    const message = sequelize.define("message", {

        id:         {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fromId:     DataTypes.STRING,  // Id of the user the message is from
        toId:       DataTypes.STRING,  
        inboxTo:    DataTypes.BOOLEAN, // If the message is in the 'to' user inbox
        inboxFrom:  DataTypes.BOOLEAN, // If the message is in the 'from' user inbox
        text:       DataTypes.STRING,  // Text of the message
        readTo:     DataTypes.BOOLEAN, // If the 'to' user has read the message
        readFrom:   DataTypes.BOOLEAN, // if the 'fron' user has read the message
        isFlirt:    DataTypes.BOOLEAN  // If the message is flirting
        
    });

    /* Associates messages with both the use who the message is from and the recipient */

    message.associate = function(models){

        message.belongsTo(models.user, 
        {foreignKey: {
            allowNull: false
        }});

        message.belongsTo(models.user, 
        {   
            as: "to",
            foreignKey: {
                allowNull: false
        }});

    }
    
    return message;
}