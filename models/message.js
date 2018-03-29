module.exports = function(sequelize, DataTypes){
    const message = sequelize.define("message", {
        id:         {
            type: DataTypes.STRING,
            primaryKey: true
        },
        toId:       DataTypes.STRING,
        inboxTo:    DataTypes.BOOLEAN, // If the message is in the 'to' user inbox
        inboxFrom:  DataTypes.BOOLEAN, // If the message is in the 'from' user inbox
        text:       DataTypes.STRING,  // Text of the message
        readTo:     DataTypes.BOOLEAN, // If the 'to' user has read the message
        readFrom:   DataTypes.BOOLEAN,  // if the 'fron' user has read the message
        isFlirt:    DataTypes.BOOLEAN,
        toName:     DataTypes.STRING,
        toImage:    DataTypes.STRING
    });

    message.associate = function(models){

        message.belongsTo(models.user, {as: 'id', foreignKey: 'userId'});
        message.belongsTo(models.user, {as: 'id', foreignKey: 'fromId'});

    }
    
    return message;
}